import {inject, Injectable, signal} from '@angular/core';
import {TopRecentPlayerRow} from "../../core/api/dtos/player/top-recent-player-row";
import {LoadingStatus} from "../../core/models/loading-status.enum";
import {PlayerApiService} from '../../core/api/services/player-api.service';

@Injectable({
  providedIn: 'root',
})
export class HomeRecentPlayersStore {
  private readonly playerApiService: PlayerApiService = inject(PlayerApiService);

  private readonly _players = signal<TopRecentPlayerRow[]>([]);
  private readonly _status = signal<LoadingStatus>(LoadingStatus.NONE);

  readonly players = this._players.asReadonly();
  readonly status = this._status.asReadonly();


  fetch(): void {
    this._status.set(LoadingStatus.LOADING);
    this.playerApiService.fetchTopRecent().subscribe({
      next: players => {
        this._players.set(players);
        this._status.set(LoadingStatus.FULLY_LOADED);
      },
      error: error => {
        console.error('Failed to fetch recent players', error);
        this._status.set(LoadingStatus.ERROR);
      }
    });
  }
}
