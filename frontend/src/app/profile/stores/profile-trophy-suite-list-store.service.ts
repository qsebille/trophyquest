import {computed, inject, Injectable, signal} from '@angular/core';
import {LoadingStatus} from "../../core/models/loading-status.enum";
import {PlayerApiService} from "../../core/api/services/player-api.service";
import {PlayedTrophySuiteSearchElement} from "../../core/api/dtos/trophy-suite/played-trophy-suite-search-element";
import {Pagination} from '../../core/api/dtos/pagination';
import {map} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileTrophySuiteListStoreService {
  private readonly playerApiService: PlayerApiService = inject(PlayerApiService);
  private readonly pageSize = 20
  private readonly pagination = signal<Pagination<PlayedTrophySuiteSearchElement> | null>(null);
  private readonly currentPage = computed(() => this.pagination()?.page ?? 0);
  private readonly _status = signal<LoadingStatus>(LoadingStatus.NONE)

  readonly trophySuites = computed(() => this.pagination()?.content ?? []);
  readonly status = this._status.asReadonly()

  reset(): void {
    this.pagination.set(null);
    this._status.set(LoadingStatus.NONE);
  }

  search(playerId: string | null, pageNumber: number = this.currentPage()): void {
    if (playerId == null) {
      console.error('Invalid player id');
      this._status.set(LoadingStatus.ERROR);
      return;
    }
    if (this._status() === LoadingStatus.LOADING) return;
    this._status.set(LoadingStatus.LOADING);

    this.playerApiService.searchPlayedTrophySuites(playerId, pageNumber, this.pageSize)
      .pipe(
        map(pagination => {
          console.log(pagination);
          const content = [...this.trophySuites(), ...pagination.content];
          return {...pagination, content} as Pagination<PlayedTrophySuiteSearchElement>;
        })
      )
      .subscribe({
        next: pagination => {
          this.pagination.set(pagination);
          const loadingStatus: LoadingStatus = pagination.content.length < pagination.total ?
            LoadingStatus.PARTIALLY_LOADED :
            LoadingStatus.FULLY_LOADED;
          this._status.set(loadingStatus);
        },
        error: () => {
          console.error(`Failed loading trophy suites for player ${playerId}`);
          this._status.set(LoadingStatus.ERROR);
        }
      })
  }

  loadMore(playerId: string | null): void {
    this.search(playerId, this.currentPage() + 1);
  }
}
