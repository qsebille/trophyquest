import {computed, inject, Injectable, signal} from '@angular/core';
import {AssociationApiService} from '../api/association-api.service';
import {Pagination} from '../../../../core/api/dtos/pagination';
import {AssociationItem} from '../../models/association-item';
import {catchError, EMPTY, finalize, Subject, switchMap} from 'rxjs';
import {NotificationService} from '../../../../core/services/notification.service';

@Injectable({
  providedIn: 'root',
})
export class AssociationStoreService {
  private readonly associationApiService = inject(AssociationApiService);
  private readonly notificationService = inject(NotificationService);

  private readonly _isLoading = signal<boolean>(false);
  private readonly _hasError = signal<boolean>(false);
  private readonly pagination = signal<Pagination<AssociationItem> | null>(null);

  private readonly loadPageSubject = new Subject<number>();

  readonly association = computed(() => this.pagination()?.content[0] ?? null);
  readonly page = computed(() => this.pagination()?.page ?? 0);
  readonly total = computed(() => this.pagination()?.total ?? 0);
  readonly isLoading = this._isLoading.asReadonly();
  readonly hasError = this._hasError.asReadonly();

  constructor() {
    this.loadPageSubject.pipe(
      switchMap(page => {
        this._isLoading.set(true);
        this._hasError.set(false);
        return this.associationApiService.fetchAssociation(page).pipe(
          catchError(err => {
            console.error('Failed to fetch association', err);
            this.notificationService.error('Failed to fetch association');
            this._hasError.set(true);
            return EMPTY;
          }),
          finalize(() => this._isLoading.set(false))
        );
      })
    ).subscribe(data => this.pagination.set(data));
  }

  init(): void {
    this.pagination.set(null);
    this.loadPageSubject.next(0);
  }

  nextPage(): void {
    if (this.page() === this.total() - 1) return;
    this.loadPageSubject.next(this.page() + 1);
  }

  previousPage(): void {
    if (this.page() === 0) return;
    this.loadPageSubject.next(this.page() - 1);
  }
}
