import {computed, inject, Injectable, signal} from '@angular/core';
import {RecentGame} from "../../core/api/dtos/game/recent-game";
import {LoadingStatus} from "../../core/models/loading-status.enum";
import {GameApiService} from "../../core/api/services/game-api.service";
import {Pagination} from '../../core/api/dtos/pagination';

@Injectable({
  providedIn: 'root',
})
export class HomeRecentGamesStore {
  private readonly gameApiService: GameApiService = inject(GameApiService);

  private readonly pagination = signal<Pagination<RecentGame> | null>(null);
  private readonly _status = signal<LoadingStatus>(LoadingStatus.NONE);

  readonly games = computed(() => this.pagination()?.content ?? []);
  readonly total = computed(() => this.pagination()?.total ?? 0);
  readonly status = this._status.asReadonly();

  fetch(): void {
    this._status.set(LoadingStatus.LOADING);
    this.gameApiService.searchRecent(0, 20).subscribe({
      next: (searchResult) => {
        this.pagination.set(searchResult);
        this._status.set(LoadingStatus.FULLY_LOADED);
      },
      error: err => {
        console.error('Failed to fetch recent games', err);
        this._status.set(LoadingStatus.ERROR);
      }
    });
  }
}
