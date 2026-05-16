import {computed, inject, Injectable, signal} from '@angular/core';
import {GameApiService} from '../../core/api/services/game-api.service';
import {NotificationService} from '../../core/services/notification.service';
import {GameDetails} from '../../core/api/dtos/game/game-details';

@Injectable()
export class GameDetailsDataService {
  private readonly gameApiService = inject(GameApiService);
  private readonly notificationService = inject(NotificationService);

  private readonly _gameDetails = signal<GameDetails | null>(null);
  private readonly _hasError = signal<boolean>(false);

  readonly gameDetails = computed(() => this._gameDetails() ?? {} as GameDetails);
  readonly hasError = this._hasError.asReadonly();

  reset(): void {
    this._gameDetails.set(null);
    this._hasError.set(false);
  }

  fetch(gameId: string): void {
    this.gameApiService.fetchDetails(gameId)
      .subscribe({
        next: (details) => {
          this._gameDetails.set(details);
        },
        error: (err) => {
          console.error('Failed to fetch game details', err);
          this.notificationService.error('Failed to fetch game details');
          this._hasError.set(true);
        }
      });
  }
}
