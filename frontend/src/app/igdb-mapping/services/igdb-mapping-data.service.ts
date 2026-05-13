import {computed, inject, Injectable, signal} from '@angular/core';
import {IgdbMappingApiService} from '../../core/api/services/igdb-mapping-api.service';
import {NotificationService} from '../../core/services/notification.service';
import {Pagination} from '../../core/api/dtos/pagination';
import {IgdbMapping} from '../../core/api/dtos/igdb/igdb-mapping';
import {catchError, EMPTY, exhaustMap, finalize, Observable, Subject, switchMap, tap} from 'rxjs';

@Injectable()
export class IgdbMappingDataService {
  private readonly igdbMappingApiService = inject(IgdbMappingApiService);
  private readonly notificationService = inject(NotificationService);

  private readonly pageSize = 20;
  private readonly initSubject = new Subject<void>();
  private readonly loadMoreSubject = new Subject<number>();
  private readonly mappingPagination = signal<Pagination<IgdbMapping> | null>(null);
  private readonly _isLoading = signal<boolean>(false);
  private readonly _isError = signal<boolean>(false);
  private readonly currentPage = computed(() => this.mappingPagination()?.page ?? 0);

  readonly mappingList = computed(() => this.mappingPagination()?.content ?? []);
  readonly total = computed(() => this.mappingPagination()?.total ?? 0);
  readonly isLoading = this._isLoading.asReadonly();
  readonly isError = this._isError.asReadonly();

  constructor() {
    this.initSubject
      .pipe(switchMap(() => this.searchPage$(0)))
      .subscribe();

    this.loadMoreSubject
      .pipe(exhaustMap(page => this.searchPage$(page)))
      .subscribe();
  }

  refresh$() {
    return this.searchPage$(0);
  }

  reset(): void {
    this.mappingPagination.set(null);
    this._isLoading.set(false);
    this._isError.set(false);
  }

  init(): void {
    this.initSubject.next();
  }

  loadMore(): void {
    this.loadMoreSubject.next(this.currentPage() + 1);
  }

  private searchPage$(pageNumber: number): Observable<Pagination<IgdbMapping>> {
    this._isLoading.set(true);
    this._isError.set(false);
    return this.igdbMappingApiService.searchPending(pageNumber, this.pageSize)
      .pipe(
        finalize(() => this._isLoading.set(false)),
        catchError(err => {
          console.error('Failed to load IGDB mappings', err);
          this._isError.set(true);
          this.notificationService.error('Failed to retrieve IGDB mapping list');
          return EMPTY;
        }),
        tap(pagination => this.mappingPagination.set(pagination))
      );
  }
}
