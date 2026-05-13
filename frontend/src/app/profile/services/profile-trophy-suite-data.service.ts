import {computed, inject, Injectable, signal} from '@angular/core';
import {PlayerApiService} from '../../core/api/services/player-api.service';
import {NotificationService} from '../../core/services/notification.service';
import {Pagination} from '../../core/api/dtos/pagination';
import {PlayerTrophySuite} from '../../core/api/dtos/trophy-suite/player-trophy-suite';
import {catchError, exhaustMap, finalize, map, Observable, of, Subject, switchMap} from 'rxjs';

@Injectable()
export class ProfileTrophySuiteDataService {
  private readonly playerApiService: PlayerApiService = inject(PlayerApiService);
  private readonly notificationService = inject(NotificationService);

  private readonly pageSize = 20
  private readonly initSubject = new Subject<string | null>();
  private readonly loadMoreSubject = new Subject<void>();
  private readonly currentPlayerId = signal<string | null>(null);
  private readonly pagination = signal<Pagination<PlayerTrophySuite> | null>(null);
  private readonly _isLoading = signal<boolean>(false);
  private readonly _isError = signal<boolean>(false);
  private readonly currentPage = computed(() => this.pagination()?.page ?? 0);

  readonly trophySuites = computed(() => this.pagination()?.content ?? []);
  readonly total = computed(() => this.pagination()?.total ?? 0);
  readonly isLoading = this._isLoading.asReadonly();
  readonly isError = this._isError.asReadonly();

  constructor() {
    this.initSubject.pipe(
      switchMap(playerId => {
        if (playerId === null) return of(null);
        this.reset();
        this.currentPlayerId.set(playerId);
        return this.searchPage(playerId, 0);
      })
    ).subscribe(pagination => {
      if (pagination !== null) {
        this.pagination.set(pagination);
      }
    });

    this.loadMoreSubject.pipe(
      exhaustMap(() => {
        const playerId = this.currentPlayerId();
        if (playerId === null) return of(null);
        return this.searchPage(playerId, this.currentPage() + 1);
      })
    ).subscribe(pagination => {
      if (pagination !== null) {
        this.pagination.set(pagination);
      }
    });
  }

  reset(): void {
    this.pagination.set(null);
    this._isLoading.set(false);
    this._isError.set(false);
  }

  init(playerId: string | null): void {
    this.initSubject.next(playerId);
  }

  loadMore(): void {
    this.loadMoreSubject.next();
  }

  private searchPage(playerId: string, pageNumber: number): Observable<Pagination<PlayerTrophySuite> | null> {
    this._isLoading.set(true);
    this._isError.set(false);

    return this.playerApiService.searchPlayedTrophySuites(playerId, pageNumber, this.pageSize).pipe(
      map(pagination => {
        const content = pageNumber === 0
          ? pagination.content
          : [...this.trophySuites(), ...pagination.content];

        return {...pagination, content} as Pagination<PlayerTrophySuite>;
      }),
      catchError(err => {
        console.error(`Failed loading trophy suites for player ${playerId}`, err);
        this.notificationService.error('Failed to retrieve trophy suites for player');
        this._isError.set(true);
        return of(null);
      }),
      finalize(() => this._isLoading.set(false))
    );
  }
}
