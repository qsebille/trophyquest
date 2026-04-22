import {computed, inject, Injectable, signal} from '@angular/core';
import {LoadingStatus} from "../../core/models/loading-status.enum";
import {PlayerApiService} from "../../core/api/services/player-api.service";
import {EarnedTrophySearchItem} from "../../core/api/dtos/trophy/earned-trophy-search-item";
import {Pagination} from '../../core/api/dtos/pagination';
import {map} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileTrophiesStore {
  private readonly playerApiService: PlayerApiService = inject(PlayerApiService);

  private readonly pageSize = 20;
  private readonly trophiesPagination = signal<Pagination<EarnedTrophySearchItem> | null>(null);
  private readonly currentPageNumber = computed(() => this.trophiesPagination()?.page ?? 0);
  private readonly _status = signal<LoadingStatus>(LoadingStatus.NONE);

  readonly trophies = computed(() => this.trophiesPagination()?.content ?? []);
  readonly status = this._status.asReadonly();

  reset(): void {
    this.trophiesPagination.set(null);
    this._status.set(LoadingStatus.NONE);
  }

  search(playerId: string | null, pageNumber: number = this.currentPageNumber()): void {
    if (playerId == null) {
      console.error('Invalid player id');
      this._status.set(LoadingStatus.ERROR);
      return;
    }
    if (this._status() === LoadingStatus.LOADING) return;

    this._status.set(LoadingStatus.LOADING);
    this.playerApiService.searchEarnedTrophies(playerId, pageNumber, this.pageSize)
      .pipe(
        map(trophyPagination => {
          const content = [...this.trophies(), ...trophyPagination.content];
          return {...trophyPagination, content} as Pagination<EarnedTrophySearchItem>;
        })
      )
      .subscribe({
        next: trophyPagination => {
          const loadingStatus = trophyPagination.content.length < trophyPagination.total ?
            LoadingStatus.PARTIALLY_LOADED :
            LoadingStatus.FULLY_LOADED;
          this.trophiesPagination.set(trophyPagination);
          this._status.set(loadingStatus);
        },
        error: () => {
          console.error(`Failed loading trophies for player ${playerId}`);
          this._status.set(LoadingStatus.ERROR);
        }
      });
  }

  loadMore(playerId: string | null): void {
    this.search(playerId, this.currentPageNumber() + 1);
  }
}
