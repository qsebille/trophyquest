import {computed, inject, Injectable, signal} from '@angular/core';
import {NotificationService} from '../../../../core/services/notification.service';
import {GameDetailsResponse} from '../../models/game-details-response';
import {GameDetailsApiService} from '../game-details-api.service';

@Injectable()
export class GameDetailsStoreService {
  private readonly gameDetailsApiService = inject(GameDetailsApiService);
  private readonly notificationService = inject(NotificationService);

  private readonly _gameDetails = signal<GameDetailsResponse | null>(null);
  private readonly _hasError = signal<boolean>(false);

  readonly gameDetails = computed(() => this._gameDetails() ?? {} as GameDetailsResponse);
  readonly hasError = this._hasError.asReadonly();

  reset(): void {
    this._gameDetails.set(null);
    this._hasError.set(false);
  }

  fetchByGameId(gameId: string): void {
    this.gameDetailsApiService.fetchDetailsByGameId(gameId)
      .subscribe({
        next: (details) => {
          this._gameDetails.set(details);
        },
        error: (err) => {
          console.error('Failed to fetch game details by game id', err);
          this.notificationService.error('Failed to fetch game details');
          this._hasError.set(true);
        }
      });
  }

  fetchBySuiteId(suiteId: string): void {
    this.gameDetailsApiService.fetchDetailsBySuiteId(suiteId)
      .subscribe({
        next: (details) => {
          this._gameDetails.set(details);
          // TODO: Rediriger si un jeu existe
        },
        error: (err) => {
          console.error('Failed to fetch game details by suite id', err);
          this.notificationService.error('Failed to fetch game details');
          this._hasError.set(true);
        }
      });
  }
}
