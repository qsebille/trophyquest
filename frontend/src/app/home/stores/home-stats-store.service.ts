import {inject, Injectable, signal} from '@angular/core';
import {LoadingStatus} from "../../core/models/loading-status.enum";
import {PlayerApiService} from "../../core/api/services/player-api.service";
import {TrophyApiService} from "../../core/api/services/trophy-api.service";
import {forkJoin} from "rxjs";
import {GameApiService} from "../../core/api/services/game-api.service";
import {HomeStatsData} from '../models/home-stats-data';

@Injectable({
  providedIn: 'root',
})
export class HomeStatsStore {
  private readonly playerApiService: PlayerApiService = inject(PlayerApiService);
  private readonly gameApiService: GameApiService = inject(GameApiService);
  private readonly trophyApiService: TrophyApiService = inject(TrophyApiService);

  private readonly _data = signal<HomeStatsData | null>(null);
  private readonly _status = signal<LoadingStatus>(LoadingStatus.NONE);

  readonly data = this._data.asReadonly();
  readonly status = this._status.asReadonly();


  fetch(): void {
    this._status.set(LoadingStatus.LOADING);

    forkJoin({
      playerCount: this.playerApiService.count(),
      gameCount: this.gameApiService.count(),
      trophyCount: this.trophyApiService.count(),
      recentPlayerCount: this.playerApiService.countRecent(),
      recentGameCount: this.gameApiService.countRecent(),
      recentTrophyCount: this.trophyApiService.countRecentlyEarned(),
    }).subscribe({
      next: ({
               playerCount,
               gameCount,
               trophyCount,
               recentPlayerCount,
               recentGameCount,
               recentTrophyCount
             }) => {
        this._data.set({
          total: {
            game: gameCount,
            player: playerCount,
            trophy: trophyCount,
          },
          lastWeek: {
            game: recentGameCount,
            player: recentPlayerCount,
            trophy: recentTrophyCount,
          }
        });
        this._status.set(LoadingStatus.FULLY_LOADED);
      },
      error: error => {
        console.error('Failed to load stats', error);
        this._status.set(LoadingStatus.ERROR);
      }
    })
  }
}
