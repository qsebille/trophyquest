import {inject, Injectable, signal} from '@angular/core';
import {AssociationApiService} from './api/association-api.service';
import {NotificationService} from '../../../core/services/notification.service';
import {catchError, delay, EMPTY, of, tap} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AssociationValidationService {
  private associationApiService = inject(AssociationApiService);
  private readonly notificationService = inject(NotificationService);
  private readonly _isLoading = signal<boolean>(false);

  readonly isLoading = this._isLoading.asReadonly();

  /**
   * Validate the association between a given suite and game
   * @param suiteId ID of the suite
   * @param gameId ID of the game
   */
  validateAssociation$(suiteId: string, gameId: number) {
    if (this.isLoading()) return EMPTY;
    this._isLoading.set(true);

    return this.associationApiService.validateAssociation(suiteId, gameId).pipe(
      delay(1000),
      tap(() => {
        this._isLoading.set(false);
        this.notificationService.success('Association validated');
        return true;
      }),
      catchError(() => {
        this._isLoading.set(false);
        this.notificationService.error('Failed to validate association');
        return of(false);
      })
    );
  }

  /**
   * Reject all candidates for the given suite
   * @param suiteId ID of the suite
   */
  rejectAllCandidates$(suiteId: string) {
    if (this.isLoading()) return EMPTY;
    this._isLoading.set(true);

    return this.associationApiService.rejectAllCandidates(suiteId).pipe(
      delay(1000),
      tap(() => {
        this._isLoading.set(false);
        this.notificationService.success('All candidates rejected');
        return true;
      }),
      catchError(() => {
        this._isLoading.set(false);
        this.notificationService.error('Failed to reject all candidates');
        return of(false);
      })
    );
  }
}
