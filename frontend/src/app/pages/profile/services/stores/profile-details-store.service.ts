import {inject, Injectable, signal} from '@angular/core';
import {NotificationService} from '../../../../core/services/notification.service';
import {catchError, EMPTY, finalize, Subject, switchMap, tap} from 'rxjs';
import {ProfileApiService} from '../api/profile-api.service';
import {ProfileDetailsResponse} from '../../models/profile-details-response';

@Injectable({
  providedIn: 'root',
})
export class ProfileDetailsStoreService {
  private readonly profileApiService = inject(ProfileApiService);
  private readonly notificationService = inject(NotificationService);

  private readonly fetchSubject = new Subject<string | null>();
  private readonly _details = signal<ProfileDetailsResponse | null>(null);
  private readonly _isLoading = signal<boolean>(false);
  private readonly _isError = signal<boolean>(false);

  readonly details = this._details.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();
  readonly hasError = this._isError.asReadonly();

  constructor() {
    this.fetchSubject
      .pipe(
        switchMap(playerId => {
          if (playerId === null) return EMPTY;
          this._isLoading.set(true);
          this._isError.set(false);

          return this.profileApiService.fetchDetails(playerId).pipe(
            catchError(err => {
              console.error('Failed to retrieve player profile details', err);
              this._isError.set(true);
              this.notificationService.error('Failed to retrieve player profile details.');
              return EMPTY;
            }),
            finalize(() => this._isLoading.set(false))
          );
        }),
        tap(data => this._details.set(data))
      )
      .subscribe();
  }

  reset(): void {
    this._details.set(null);
    this._isLoading.set(false);
    this._isError.set(false);
  }

  retrieve(playerId: string | null): void {
    this.fetchSubject.next(playerId);
  }
}
