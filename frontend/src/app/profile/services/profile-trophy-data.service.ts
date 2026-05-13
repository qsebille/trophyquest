import {computed, inject, Injectable, signal} from '@angular/core';
import {PlayerApiService} from '../../core/api/services/player-api.service';
import {NotificationService} from '../../core/services/notification.service';
import {Pagination} from '../../core/api/dtos/pagination';
import {PlayerEarnedTrophy} from '../../core/api/dtos/trophy/player-earned-trophy';
import {catchError, EMPTY, exhaustMap, finalize, map, Observable, Subject, switchMap, tap} from 'rxjs';

@Injectable()
export class ProfileTrophyDataService {
  private readonly playerApiService: PlayerApiService = inject(PlayerApiService);
  private readonly notificationService = inject(NotificationService);
  private readonly pageSize = 20;
  private readonly pagination = signal<Pagination<PlayerEarnedTrophy> | null>(null);
  private readonly _isLoading = signal<boolean>(false);
  private readonly _isError = signal<boolean>(false);
  private readonly currentPageNumber = computed(() => this.pagination()?.page ?? 0);
  private readonly currentPlayerId = signal<string | null>(null);
  private readonly initSubject = new Subject<string | null>();
  private readonly loadMoreSubject = new Subject<void>();

  readonly trophies = computed(() => this.pagination()?.content ?? []);
  readonly total = computed(() => this.pagination()?.total ?? 0);
  readonly isLoading = this._isLoading.asReadonly();
  readonly isError = this._isError.asReadonly();

  constructor() {
    this.initSubject.pipe(
      switchMap(playerId => {
        if (playerId === null) return EMPTY;
        this.reset();
        this.currentPlayerId.set(playerId);
        return this.searchPage(playerId, 0);
      }),
      tap(pagination => this.pagination.set(pagination))
    ).subscribe();

    this.loadMoreSubject.pipe(
      exhaustMap(() => {
        const playerId = this.currentPlayerId();
        const pageNumber = this.currentPageNumber() + 1;
        if (playerId === null) return EMPTY;
        return this.searchPage(playerId, pageNumber);
      }),
      tap(pagination => this.pagination.set(pagination))
    ).subscribe();
  }

  private searchPage(playerId: string, pageNumber: number = this.currentPageNumber()): Observable<Pagination<PlayerEarnedTrophy>> {
    this._isLoading.set(true);
    this._isError.set(false);

    return this.playerApiService.searchEarnedTrophies(playerId, pageNumber, this.pageSize)
      .pipe(
        map(pagination => {
          const content = pageNumber === 0 ? pagination.content : [...this.trophies(), ...pagination.content];
          return {...pagination, content} as Pagination<PlayerEarnedTrophy>;
        }),
        catchError(err => {
          console.error(`Failed loading earned trophies for player ${playerId}`, err);
          this.notificationService.error('Failed to retrieve earned trophies for player');
          this._isError.set(true);
          return EMPTY;
        }),
        finalize(() => this._isLoading.set(false))
      );
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
}
