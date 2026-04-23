import {inject, Injectable, signal} from '@angular/core';
import {PlayerApiService} from '../../core/api/services/player-api.service';
import {finalize, of, switchMap} from 'rxjs';
import {PlayersService} from './players.service';
import {NotificationService} from '../../core/services/notification.service';

@Injectable({
  providedIn: 'root',
})
export class PlayersAddService {
  private readonly playerApiService = inject(PlayerApiService);
  private readonly playersService = inject(PlayersService);
  private readonly notificationService = inject(NotificationService);
  private readonly _isLoading = signal<boolean>(false);

  readonly isLoading = this._isLoading.asReadonly();

  addPlayer(pseudo: string): void {
    if (this.isLoading()) return;
    this._isLoading.set(true);

    this.playerApiService.fetchByPseudo(pseudo)
      .pipe(
        switchMap(response => {
          if (response === null) {
            console.info("Player not found in database, adding it to database...");
            this.notificationService.info(`Adding ${pseudo} to TrophyQuest...`);
            return this.playerApiService.addPlayer(pseudo);
          } else {
            console.info("Player already in database, not adding it to database");
            this.notificationService.error(`Player ${pseudo} already registered`);
            return of({status: 'ERROR', message: 'Player already in database'});
          }
        }),
        finalize(() => this._isLoading.set(false))
      ).subscribe({
      next: response => {
        switch (response.status) {
          case 'OK':
            this.playersService.search(0);
            this.notificationService.success(`Player ${pseudo} added successfully`);
            break;
          case 'ERROR':
            console.error('Error when adding player: ', response);
        }
      },
      error: error => {
        console.error('Error when adding player: ', error);
        this.notificationService.error(`Failed to add player ${pseudo}`);
      }
    });
  }
}
