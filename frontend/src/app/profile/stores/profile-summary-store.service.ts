import {inject, Injectable, signal} from '@angular/core';
import {EMPTY_PLAYER, Player} from "../../core/api/dtos/player/player";
import {LoadingStatus} from "../../core/models/loading-status.enum";
import {forkJoin} from "rxjs";
import {PlayerApiService} from "../../core/api/services/player-api.service";
import {EMPTY_PLAYER_STATS, PlayerStats} from "../../core/api/dtos/player/player-stats";

@Injectable({
  providedIn: 'root',
})
export class ProfileSummaryStore {
  private readonly playerApiService: PlayerApiService = inject(PlayerApiService);
  private readonly _player = signal<Player>(EMPTY_PLAYER);
  private readonly _playerStats = signal<PlayerStats>(EMPTY_PLAYER_STATS);
  private readonly _status = signal<LoadingStatus>(LoadingStatus.NONE);

  readonly player = this._player.asReadonly();
  readonly playerStats = this._playerStats.asReadonly();
  readonly status = this._status.asReadonly();

  reset(): void {
    this._player.set(EMPTY_PLAYER);
    this._playerStats.set(EMPTY_PLAYER_STATS);
    this._status.set(LoadingStatus.NONE);
  }

  retrieve(playerId: string | null): void {
    if (playerId == null) {
      console.error('Invalid player id');
      this._status.set(LoadingStatus.ERROR);
      return;
    }

    this._status.set(LoadingStatus.LOADING);
    forkJoin({
      player: this.playerApiService.fetch(playerId),
      stats: this.playerApiService.fetchStats(playerId),
    }).subscribe({
        next: ({player, stats}) => {
          this._player.set(player);
          this._playerStats.set(stats);
          this._status.set(LoadingStatus.FULLY_LOADED);
        },
        error: error => {
          console.error(error);
          this._status.set(LoadingStatus.ERROR);
        }
      }
    )
  }
}
