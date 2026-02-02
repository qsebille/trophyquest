import {Injectable, signal} from '@angular/core';
import {LoadingStatus} from "../../core/models/loading-status.enum";
import {IgdbMapping} from "../../core/api/dtos/candidate/igdb-mapping";
import {ValidateCandidateStatus} from "../../core/models/validate-candidate-status";
import {catchError, EMPTY, tap} from "rxjs";
import {IgdbCandidateApiService} from "../../core/api/services/igdb-candidate-api.service";

@Injectable({
    providedIn: 'root',
})
export class IgdbMappingStoreService {
    private readonly _pageSize = 20;
    private readonly _pageNumber = signal<number>(0);
    private readonly _total = signal<number>(0);
    private readonly _igdbMappingList = signal<IgdbMapping[]>([]);
    private readonly _status = signal<LoadingStatus>(LoadingStatus.NONE);
    private readonly _validationStatus = signal<ValidateCandidateStatus>(ValidateCandidateStatus.NONE);

    readonly mappingList = this._igdbMappingList.asReadonly();
    readonly total = this._total.asReadonly();
    readonly status = this._status.asReadonly();
    readonly validationStatus = this._validationStatus.asReadonly();


    constructor(private readonly _igdbCandidateApiService: IgdbCandidateApiService) {
    }

    reset(): void {
        this._pageNumber.set(0);
        this._igdbMappingList.set([]);
        this._total.set(0);
        this._status.set(LoadingStatus.NONE);
    }

    search(): void {
        this._status.set(LoadingStatus.LOADING);
        this._igdbCandidateApiService.searchPending(this._pageNumber(), this._pageSize).subscribe({
            next: searchResult => {
                const mappings = [...this._igdbMappingList(), ...searchResult.content] as IgdbMapping[];
                const loadingStatus: LoadingStatus = mappings.length < searchResult.total ? LoadingStatus.PARTIALLY_LOADED : LoadingStatus.FULLY_LOADED;
                this._igdbMappingList.update(() => mappings);
                this._total.set(searchResult.total);
                this._status.set(loadingStatus);
            },
            error: error => {
                console.error(error);
                this._status.set(LoadingStatus.ERROR);
            }
        });
    }

    loadMore(): void {
        this._pageNumber.update(n => n + 1);
        this.search();
    }

    validateCandidate(gameId: string, candidateId: number): void {
        this._validationStatus.set(ValidateCandidateStatus.LOADING);
        this._igdbCandidateApiService.validateCandidate(gameId, candidateId).pipe(
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
        this._igdbCandidateApiService.rejectCandidates(gameId).subscribe({
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
