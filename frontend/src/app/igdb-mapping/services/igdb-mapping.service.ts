import {computed, inject, Injectable, signal} from '@angular/core';
import {Pagination} from '../../core/api/dtos/pagination';
import {IgdbMapping} from '../../core/api/dtos/igdb/igdb-mapping';
import {ValidateCandidateStatus} from '../../core/models/validate-candidate-status';
import {IgdbMappingApiService} from '../../core/api/services/igdb-mapping-api.service';
import {finalize, map} from 'rxjs';
import {NotificationService} from '../../core/services/notification.service';

@Injectable({
  providedIn: 'root',
})
export class IgdbMappingService {
  private readonly pageSize = 20;
  private readonly igdbCandidateApiService: IgdbMappingApiService = inject(IgdbMappingApiService);
  private readonly notificationService = inject(NotificationService);
  private readonly mappingPagination = signal<Pagination<IgdbMapping> | null>(null);
  private readonly _isLoading = signal<boolean>(false);
  private readonly _validationStatus = signal<ValidateCandidateStatus>(ValidateCandidateStatus.NONE);
  private readonly currentPage = computed(() => this.mappingPagination()?.page ?? 0);

  readonly mappingList = computed(() => this.mappingPagination()?.content ?? []);
  readonly total = computed(() => this.mappingPagination()?.total ?? 0);
  readonly isLoading = this._isLoading.asReadonly();
  readonly validationStatus = this._validationStatus.asReadonly();

  reset(): void {
    this.mappingPagination.set(null);
    this._isLoading.set(false);
    this._validationStatus.set(ValidateCandidateStatus.NONE);
  }

  search(pageNumber: number = this.currentPage()): void {
    if (this.isLoading()) return;
    this._isLoading.set(true);

    this.igdbCandidateApiService.searchPending(pageNumber, this.pageSize)
      .pipe(
        map(mappingPagination => {
          const content = [...this.mappingList(), ...mappingPagination.content];
          return {...mappingPagination, content};
        }),
        finalize(() => this._isLoading.set(false))
      )
      .subscribe({
        next: mappingPagination => this.mappingPagination.set(mappingPagination),
        error: error => {
          this.notificationService.error('Failed to retrieve IGDB mapping list');
          console.error(error);
        }
      });
  }

  loadMore(): void {
    this.search(this.currentPage() + 1);
  }

  validateCandidate(gameId: string, candidateId: number): void {
    if (this.validationStatus() === ValidateCandidateStatus.LOADING) return;
    this._validationStatus.set(ValidateCandidateStatus.LOADING);

    this.igdbCandidateApiService.validateCandidate(gameId, candidateId)
      .subscribe({
        next: () => {
          this._validationStatus.set(ValidateCandidateStatus.SUCCESS);
          this.reset();
          this.search();
          this.notificationService.success('Candidate validated successfully');
        },
        error: error => {
          console.error(error);
          this._validationStatus.set(ValidateCandidateStatus.ERROR);
          this.notificationService.error('Failed to validate candidate');
        }
      });
  }

  rejectCandidates(gameId: string): void {
    this._validationStatus.set(ValidateCandidateStatus.LOADING);
    this.igdbCandidateApiService.rejectCandidates(gameId).subscribe({
      next: () => {
        this._validationStatus.set(ValidateCandidateStatus.SUCCESS);
        this.reset();
        this.search();
        this.notificationService.success('Candidates rejected successfully');
      },
      error: error => {
        console.error(error);
        this._validationStatus.set(ValidateCandidateStatus.ERROR);
        this.notificationService.error('Failed to reject candidates');
      }
    });
  }
}
