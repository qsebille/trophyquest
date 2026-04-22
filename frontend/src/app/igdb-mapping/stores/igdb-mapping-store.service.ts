import {computed, inject, Injectable, signal} from '@angular/core';
import {LoadingStatus} from "../../core/models/loading-status.enum";
import {IgdbMapping} from "../../core/api/dtos/igdb/igdb-mapping";
import {ValidateCandidateStatus} from "../../core/models/validate-candidate-status";
import {catchError, EMPTY, map, tap} from "rxjs";
import {IgdbMappingApiService} from "../../core/api/services/igdb-mapping-api.service";
import {Pagination} from '../../core/api/dtos/pagination';

@Injectable({
  providedIn: 'root',
})
export class IgdbMappingStoreService {
  private readonly pageSize = 20;

  private readonly mappingPagination = signal<Pagination<IgdbMapping> | null>(null);
  private readonly currentPage = computed(() => this.mappingPagination()?.page ?? 0);
  private readonly _status = signal<LoadingStatus>(LoadingStatus.NONE);
  private readonly _validationStatus = signal<ValidateCandidateStatus>(ValidateCandidateStatus.NONE);
  private readonly igdbCandidateApiService: IgdbMappingApiService = inject(IgdbMappingApiService);

  readonly mappingList = computed(() => this.mappingPagination()?.content ?? []);
  readonly total = computed(() => this.mappingPagination()?.total ?? 0);
  readonly status = this._status.asReadonly();
  readonly validationStatus = this._validationStatus.asReadonly();

  reset(): void {
    this.mappingPagination.set(null);
    this._status.set(LoadingStatus.NONE);
  }

  search(pageNumber: number = this.currentPage()): void {
    if (this._status() === LoadingStatus.LOADING) return;
    this._status.set(LoadingStatus.LOADING);

    this.igdbCandidateApiService.searchPending(pageNumber, this.pageSize)
      .pipe(
        map(mappingPagination => {
          const content = [...this.mappingList(), ...mappingPagination.content];
          return {...mappingPagination, content};
        })
      )
      .subscribe({
        next: mappingPagination => {
          this.mappingPagination.set(mappingPagination);
          const loadingStatus =
            mappingPagination.content.length < mappingPagination.total
              ? LoadingStatus.PARTIALLY_LOADED
              : LoadingStatus.FULLY_LOADED;
          this._status.set(loadingStatus);
        },
        error: error => {
          console.error(error);
          this._status.set(LoadingStatus.ERROR);
        }
      });
  }

  loadMore(): void {
    this.search(this.currentPage() + 1);
  }

  validateCandidate(gameId: string, candidateId: number): void {
    this._validationStatus.set(ValidateCandidateStatus.LOADING);
    this.igdbCandidateApiService.validateCandidate(gameId, candidateId).pipe(
      tap((success: boolean) => {
        if (success) {
          this._validationStatus.set(ValidateCandidateStatus.SUCCESS);
          this.reset();
          this.search();
        } else {
          this._validationStatus.set(ValidateCandidateStatus.ERROR);
        }
      }),
      catchError(() => {
        console.error('Failed to validate candidate');
        this._validationStatus.set(ValidateCandidateStatus.ERROR);
        return EMPTY;
      })
    ).subscribe();
  }

  rejectCandidates(gameId: string): void {
    this._validationStatus.set(ValidateCandidateStatus.LOADING);
    this.igdbCandidateApiService.rejectCandidates(gameId).subscribe({
      next: () => {
        this._validationStatus.set(ValidateCandidateStatus.SUCCESS);
        this.reset();
        this.search();
      },
      error: error => {
        console.error(error);
        this._validationStatus.set(ValidateCandidateStatus.ERROR);
      }
    })
  }
}
