import {inject, Injectable, signal} from '@angular/core';
import {IgdbMappingApiService} from '../../core/api/services/igdb-mapping-api.service';
import {NotificationService} from '../../core/services/notification.service';
import {catchError, EMPTY, finalize, Observable, tap} from 'rxjs';

@Injectable()
export class IgdbMappingValidationService {
  private readonly igdbCandidateApiService = inject(IgdbMappingApiService);
  private readonly notificationService = inject(NotificationService);
  private readonly _isLoading = signal<boolean>(false);

  readonly isLoading = this._isLoading.asReadonly();

  validateCandidate$(gameId: string, candidateId: number): Observable<boolean> {
    if (this.isLoading()) return EMPTY;
    this._isLoading.set(true);

    return this.igdbCandidateApiService.validateCandidate(gameId, candidateId)
      .pipe(
        tap(() => this.notificationService.success('Candidate validated')),
        finalize(() => this._isLoading.set(false)),
        catchError(err => {
          console.error('Failed to validated candidate', err);
          this.notificationService.error('Failed to validate candidate');
          return EMPTY;
        })
      );
  }

  rejectCandidates$(gameId: string): Observable<boolean> {
    this._isLoading.set(true);
    return this.igdbCandidateApiService.rejectCandidates(gameId)
      .pipe(
        tap(() => this.notificationService.success('Candidates rejected successfully')),
        finalize(() => this._isLoading.set(false)),
        catchError(err => {
          console.error('Failed to reject candidates', err);
          this.notificationService.error('Failed to reject candidates');
          return EMPTY;
        })
      );
  }
}
