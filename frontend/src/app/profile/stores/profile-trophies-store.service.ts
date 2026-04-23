import {computed, inject, Injectable, signal} from '@angular/core';
import {PlayerApiService} from "../../core/api/services/player-api.service";
import {EarnedTrophySearchItem} from "../../core/api/dtos/trophy/earned-trophy-search-item";
import {Pagination} from '../../core/api/dtos/pagination';
import {finalize, map} from 'rxjs';
import {NotificationService} from '../../core/services/notification.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileTrophiesStore {
  private readonly playerApiService: PlayerApiService = inject(PlayerApiService);
  private readonly notificationService = inject(NotificationService);
  private readonly pageSize = 20;
  private readonly pagination = signal<Pagination<EarnedTrophySearchItem> | null>(null);
  private readonly _isLoading = signal<boolean>(false);
  private readonly currentPageNumber = computed(() => this.pagination()?.page ?? 0);

  readonly trophies = computed(() => this.pagination()?.content ?? []);
  readonly total = computed(() => this.pagination()?.total ?? 0);
  readonly isLoading = this._isLoading.asReadonly();

  reset(): void {
    this.pagination.set(null);
    this._isLoading.set(false);
  }

  search(playerId: string, pageNumber: number = this.currentPageNumber()): void {
    if (this._isLoading()) return;
    this._isLoading.set(true);

    this.playerApiService.searchEarnedTrophies(playerId, pageNumber, this.pageSize)
      .pipe(
        map(pagination => {
          const content = [...this.trophies(), ...pagination.content];
          return {...pagination, content} as Pagination<EarnedTrophySearchItem>;
        }),
        finalize(() => this._isLoading.set(false)),
      )
      .subscribe({
        next: pagination => this.pagination.set(pagination),
        error: () => {
          console.error(`Failed loading trophies for player ${playerId}`);
          this.notificationService.error('Failed to retrieve trophies for player');
        }
      });
  }

  loadMore(playerId: string): void {
    this.search(playerId, this.currentPageNumber() + 1);
  }
}
