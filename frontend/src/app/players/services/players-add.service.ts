import {inject, Injectable, signal} from '@angular/core';
import {PlayerApiService} from '../../core/api/services/player-api.service';
import {catchError, defer, EMPTY, finalize, Observable, of, switchMap, throwError} from 'rxjs';
import {NotificationService} from '../../core/services/notification.service';
import {PlayerAddResponse} from '../../core/api/dtos/player/player-add-response';

@Injectable()
export class PlayersAddService {
  private readonly playerApiService = inject(PlayerApiService);
  private readonly notificationService = inject(NotificationService);
  private readonly _isLoading = signal<boolean>(false);

  readonly isLoading = this._isLoading.asReadonly();

  addPlayer$(pseudo: string): Observable<PlayerAddResponse> {
    return defer(() => {
      if (this.isLoading()) return EMPTY;
      this._isLoading.set(true);

      return this.playerApiService.fetchByPseudo(pseudo)
        .pipe(
          switchMap(response => {
            if (response !== null) {
              this.notificationService.error(`Player ${pseudo} already registered`);
              return EMPTY;
            }

            this.notificationService.info(`Adding ${pseudo} to TrophyQuest...`);

            return this.playerApiService.addPlayer(pseudo).pipe(
              switchMap(response => {
                if (response.status === 'OK') {
                  this.notificationService.success(`Player ${pseudo} added successfully`);
                  return of(response);
                }
                return throwError(() => new Error(`Failed to add player ${pseudo}`));
              })
            );
          }),
          catchError(error => {
            this.notificationService.error(`Failed to add player ${pseudo}`);
            return throwError(() => error);
          }),
          finalize(() => this._isLoading.set(false))
        );
    });
  }
}
