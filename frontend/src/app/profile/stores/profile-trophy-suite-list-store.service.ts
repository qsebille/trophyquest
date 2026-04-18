import {inject, Injectable, signal} from '@angular/core';
import {LoadingStatus} from "../../core/models/loading-status.enum";
import {PlayerApiService} from "../../core/api/services/player-api.service";
import {PlayedTrophySuiteSearchElement} from "../../core/api/dtos/trophy-suite/played-trophy-suite-search-element";

@Injectable({
  providedIn: 'root',
})
export class ProfileTrophySuiteListStoreService {
  private readonly playerApiService: PlayerApiService = inject(PlayerApiService);
  private pageNumber = 0;
  private readonly pageSize = 20
  private readonly _trophySuites = signal<PlayedTrophySuiteSearchElement[]>([])
  private readonly _status = signal<LoadingStatus>(LoadingStatus.NONE)

  readonly trophySuites = this._trophySuites.asReadonly()
  readonly status = this._status.asReadonly()

  reset(): void {
    this._trophySuites.set([]);
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
    this.playerApiService.searchPlayedTrophySuites(playerId, pageNumber, this.pageSize).subscribe({
      next: searchResult => {
        const trophySuites = [...this._trophySuites(), ...searchResult.content];
        const loadingStatus: LoadingStatus = trophySuites.length < searchResult.total ? LoadingStatus.PARTIALLY_LOADED : LoadingStatus.FULLY_LOADED;
        this._trophySuites.update(() => trophySuites);
        this._status.set(loadingStatus);
        this.pageNumber = pageNumber;
      },
      error: () => {
        console.error(`Failed loading trophy suites for player ${playerId}`);
        this._status.set(LoadingStatus.ERROR);
      }
    })
  }

  loadMore(playerId: string | null): void {
    this.search(playerId, this.pageNumber + 1);
  }
}
