import {inject, Injectable, signal} from '@angular/core';
import {LoadingStatus} from "../../core/models/loading-status.enum";
import {PlayerApiService} from "../../core/api/services/player-api.service";
import {EarnedTrophySearchItem} from "../../core/api/dtos/trophy/earned-trophy-search-item";

@Injectable({
  providedIn: 'root',
})
export class ProfileTrophiesStore {
  private readonly playerApiService: PlayerApiService = inject(PlayerApiService);
  private pageNumber = 0;
  private readonly pageSize = 20;
  private readonly _trophies = signal<EarnedTrophySearchItem[]>([]);
  private readonly _status = signal<LoadingStatus>(LoadingStatus.NONE);

  readonly trophies = this._trophies.asReadonly();
  readonly status = this._status.asReadonly();

  reset(): void {
    this._trophies.set([]);
    this.pageNumber = 0;
    this._status.set(LoadingStatus.NONE);
  }

  search(playerId: string | null, pageNumber: number = this.pageNumber): void {
    if (playerId == null) {
      console.error('Invalid player id');
      this._status.set(LoadingStatus.ERROR);
      return;
    }

    this._status.set(LoadingStatus.LOADING);
    this.playerApiService.searchEarnedTrophies(playerId, pageNumber, this.pageSize).subscribe({
      next: searchResult => {
        const trophies = [...this._trophies(), ...searchResult.content];
        const loadingStatus: LoadingStatus = trophies.length < searchResult.total ? LoadingStatus.PARTIALLY_LOADED : LoadingStatus.FULLY_LOADED;
        this._trophies.update(() => trophies);
        this._status.set(loadingStatus);
        this.pageNumber = pageNumber;
      },
      error: () => {
        console.error(`Failed loading trophies for player ${playerId}`);
        this._status.set(LoadingStatus.ERROR);
      }
    });
  }

  loadMore(playerId: string | null): void {
    this.search(playerId, this.pageNumber + 1);
  }
}
