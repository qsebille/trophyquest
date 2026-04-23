import {inject, Injectable, signal} from '@angular/core';
import {emptyPlayer, Player} from "../../core/api/dtos/player/player";
import {finalize, forkJoin} from "rxjs";
import {PlayerApiService} from "../../core/api/services/player-api.service";
import {emptyPlayerStats, PlayerStats} from "../../core/api/dtos/player/player-stats";
import {NotificationService} from '../../core/services/notification.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileSummaryStore {
  private readonly playerApiService = inject(PlayerApiService);
  private readonly notificationService = inject(NotificationService);
  private readonly _player = signal<Player>(emptyPlayer);
  private readonly _playerStats = signal<PlayerStats>(emptyPlayerStats);
  private readonly _isLoading = signal<boolean>(false);

  readonly player = this._player.asReadonly();
  readonly playerStats = this._playerStats.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();

  reset(): void {
    this._player.set(emptyPlayer);
    this._playerStats.set(emptyPlayerStats);
    this._isLoading.set(false);
  }

  retrieve(playerId: string): void {
    if (this._isLoading()) return;
    this._isLoading.set(true);

    forkJoin({
      player: this.playerApiService.fetch(playerId),
      stats: this.playerApiService.fetchStats(playerId),
    })
      .pipe(finalize(() => this._isLoading.set(false)))
      .subscribe({
        next: ({player, stats}) => {
          this._player.set(player);
          this._playerStats.set(stats);
        },
        error: error => {
          console.error(error);
          this.notificationService.error('Failed to retrieve player profile');
        }
      });
  }
}
