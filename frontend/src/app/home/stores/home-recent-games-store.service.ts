import {inject, Injectable, signal} from '@angular/core';
import {RecentGame} from "../../core/api/dtos/game/recent-game";
import {LoadingStatus} from "../../core/models/loading-status.enum";
import {GameApiService} from "../../core/api/services/game-api.service";

@Injectable({
  providedIn: 'root',
})
export class HomeRecentGamesStore {
  private readonly gameApiService: GameApiService = inject(GameApiService);

  private readonly _recentGames = signal<RecentGame[]>([]);
  private readonly _total = signal<number>(0);
  private readonly _status = signal<LoadingStatus>(LoadingStatus.NONE);

  readonly recentGames = this._recentGames.asReadonly();
  readonly total = this._total.asReadonly();
  readonly status = this._status.asReadonly();

  fetch(): void {
    this._status.set(LoadingStatus.LOADING);
    this.gameApiService.searchRecent(0, 20).subscribe({
      next: (searchResult) => {
        this._recentGames.set(searchResult.content);
        this._total.set(searchResult.total)
        this._status.set(LoadingStatus.FULLY_LOADED);
      },
      error: err => {
        console.error('Failed to fetch recent games', err);
        this._status.set(LoadingStatus.ERROR);
      }
    });
  }
}
