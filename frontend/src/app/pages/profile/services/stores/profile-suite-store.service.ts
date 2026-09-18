import {computed, inject, Injectable, signal} from '@angular/core';
import {NotificationService} from '../../../../core/services/notification.service';
import {catchError, exhaustMap, finalize, map, Observable, of, Subject, switchMap} from 'rxjs';
import {Pagination} from '../../../../core/api/dtos/pagination';
import {ProfileApiService} from '../api/profile-api.service';
import {ProfileSuiteItem} from '../../models/profile-suite-item';

@Injectable({
  providedIn: 'root',
})
export class ProfileSuiteStoreService {
  private readonly profileApiService = inject(ProfileApiService);
  private readonly notificationService = inject(NotificationService);

  private readonly pageSize = 20
  private readonly initSubject = new Subject<string | null>();
  private readonly loadMoreSubject = new Subject<void>();
  private readonly playerId = signal<string | null>(null);
  private readonly pagination = signal<Pagination<ProfileSuiteItem> | null>(null);
  private readonly _isLoading = signal<boolean>(false);
  private readonly _hasError = signal<boolean>(false);
  private readonly currentPage = computed(() => this.pagination()?.page ?? 0);

  readonly suites = computed(() => this.pagination()?.content ?? []);
  readonly total = computed(() => this.pagination()?.total ?? 0);
  readonly isLoading = this._isLoading.asReadonly();
  readonly hasError = this._hasError.asReadonly();

  constructor() {
    this.initSubject.pipe(
      switchMap(playerId => {
        if (playerId === null) return of(null);
        this.reset();
        this.playerId.set(playerId);
        return this.searchPage(playerId, 0);
      })
    ).subscribe(pagination => {
      if (pagination !== null) {
        this.pagination.set(pagination);
      }
    });

    this.loadMoreSubject.pipe(
      exhaustMap(() => {
        const playerId = this.playerId();
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
    this._hasError.set(false);
  }

  init(playerId: string | null): void {
    this.initSubject.next(playerId);
  }

  loadMore(): void {
    this.loadMoreSubject.next();
  }

  private searchPage(playerId: string, pageNumber: number): Observable<Pagination<ProfileSuiteItem> | null> {
    this._isLoading.set(true);
    this._hasError.set(false);

    return this.profileApiService.searchSuites(playerId, pageNumber, this.pageSize).pipe(
      map(pagination => {
        const content = pageNumber === 0
          ? pagination.content
          : [...this.suites(), ...pagination.content];

        return {...pagination, content} as Pagination<ProfileSuiteItem>;
      }),
      catchError(err => {
        console.error(`Failed loading suites for player ${playerId}`, err);
        this.notificationService.error('Failed to retrieve suites for player.');
        this._hasError.set(true);
        return of(null);
      }),
      finalize(() => this._isLoading.set(false))
    );
  }
}
