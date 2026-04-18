import {inject, Injectable, signal} from '@angular/core';
import {LoadingStatus} from "../../core/models/loading-status.enum";
import {IgdbMapping} from "../../core/api/dtos/igdb/igdb-mapping";
import {ValidateCandidateStatus} from "../../core/models/validate-candidate-status";
import {catchError, EMPTY, tap} from "rxjs";
import {IgdbMappingApiService} from "../../core/api/services/igdb-mapping-api.service";

@Injectable({
  providedIn: 'root',
})
export class IgdbMappingStoreService {
  private pageNumber = 0;
  private readonly pageSize = 20;
  private readonly _total = signal<number>(0);
  private readonly _mappingList = signal<IgdbMapping[]>([]);
  private readonly _status = signal<LoadingStatus>(LoadingStatus.NONE);
  private readonly _validationStatus = signal<ValidateCandidateStatus>(ValidateCandidateStatus.NONE);
  private readonly igdbCandidateApiService: IgdbMappingApiService = inject(IgdbMappingApiService);

  readonly mappingList = this._mappingList.asReadonly();
  readonly total = this._total.asReadonly();
  readonly status = this._status.asReadonly();
  readonly validationStatus = this._validationStatus.asReadonly();


  reset(): void {
    this.pageNumber = 0;
    this._mappingList.set([]);
    this._total.set(0);
    this._status.set(LoadingStatus.NONE);
  }

  search(pageNumber: number = this.pageNumber): void {
    this._status.set(LoadingStatus.LOADING);
    this.igdbCandidateApiService.searchPending(pageNumber, this.pageSize).subscribe({
      next: searchResult => {
        const mappings = [...this._mappingList(), ...searchResult.content] as IgdbMapping[];
        const loadingStatus: LoadingStatus = mappings.length < searchResult.total ? LoadingStatus.PARTIALLY_LOADED : LoadingStatus.FULLY_LOADED;
        this._mappingList.update(() => mappings);
        this._total.set(searchResult.total);
        this._status.set(loadingStatus);
        this.pageNumber = pageNumber;
      },
      error: error => {
        console.error(error);
        this._status.set(LoadingStatus.ERROR);
      }
    });
  }

  loadMore(): void {
    this.search(this.pageNumber + 1);
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
