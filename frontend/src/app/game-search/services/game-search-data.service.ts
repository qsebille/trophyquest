import {computed, inject, Injectable, signal} from '@angular/core';
import {GameApiService} from '../../core/api/services/game-api.service';
import {NotificationService} from '../../core/services/notification.service';
import {GameSearchItem} from '../../core/api/dtos/game/game-search-item';
import {Pagination} from '../../core/api/dtos/pagination';
import {catchError, EMPTY, exhaustMap, finalize, Observable, Subject, switchMap, tap} from 'rxjs';

@Injectable()
export class GameSearchDataService {
  private readonly gameApiService = inject(GameApiService);
  private readonly notificationService = inject(NotificationService);

  private readonly pageSize = 50;
  private readonly searchSubject = new Subject<string>();
  private readonly loadMoreSubject = new Subject<number>();
  private readonly searchTerm = signal('');
  private readonly pagination = signal<Pagination<GameSearchItem> | null>(null);
  private readonly total = computed(() => this.pagination()?.total ?? 0);
  private readonly _isLoading = signal(false);
  private readonly _isError = signal(false);

  readonly games = computed(() => this.pagination()?.content ?? []);
  readonly isLoading = this._isLoading.asReadonly();
  readonly isError = this._isError.asReadonly();
  readonly currentPage = computed(() => this.pagination()?.page ?? 0);
  readonly hasMore = computed(() => this.games().length < this.total());

  constructor() {
    this.searchSubject
      .pipe(switchMap(term => this.searchPage$(term, 0)))
      .subscribe();
    this.loadMoreSubject
      .pipe(exhaustMap(page => this.searchPage$(this.searchTerm(), page)))
      .subscribe();
  }

  init(): void {
    this.search('');
  }

  search(term: string): void {
    this.pagination.set(null);
    this._isError.set(false);
    this.searchSubject.next(term);
  }

  loadMore(): void {
    if (this._isLoading() || !this.hasMore()) {
      return;
    }
    this.loadMoreSubject.next(this.currentPage() + 1);
  }

  reset(): void {
    this.searchTerm.set('');
    this.pagination.set(null);
    this._isLoading.set(false);
    this._isError.set(false);
  }

  private searchPage$(term: string, page: number): Observable<Pagination<GameSearchItem>> {
    this.searchTerm.set(term);
    this._isLoading.set(true);
    this._isError.set(false);

    return this.gameApiService.search(this.searchTerm(), page, this.pageSize).pipe(
      tap(pagination => {
        this.pagination.update(current => ({
          ...pagination,
          content: page > 0
            ? [...(current?.content ?? []), ...pagination.content]
            : pagination.content,
        }));
      }),
      catchError(() => {
        this._isError.set(true);
        this.notificationService.error('Failed to retrieve games');
        return EMPTY;
      }),
      finalize(() => this._isLoading.set(false))
    );
  }
}
