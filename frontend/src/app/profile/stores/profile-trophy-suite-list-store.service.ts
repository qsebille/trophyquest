import {computed, inject, Injectable, signal} from '@angular/core';
import {PlayerApiService} from "../../core/api/services/player-api.service";
import {PlayedTrophySuiteSearchElement} from "../../core/api/dtos/trophy-suite/played-trophy-suite-search-element";
import {Pagination} from '../../core/api/dtos/pagination';
import {finalize, map} from 'rxjs';
import {NotificationService} from '../../core/services/notification.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileTrophySuiteListStoreService {
  private readonly playerApiService: PlayerApiService = inject(PlayerApiService);
  private readonly notificationService = inject(NotificationService);
  private readonly pageSize = 20
  private readonly pagination = signal<Pagination<PlayedTrophySuiteSearchElement> | null>(null);
  private readonly _isLoading = signal<boolean>(false);
  private readonly currentPage = computed(() => this.pagination()?.page ?? 0);
  
  readonly trophySuites = computed(() => this.pagination()?.content ?? []);
  readonly total = computed(() => this.pagination()?.total ?? 0);
  readonly isLoading = this._isLoading.asReadonly()

  reset(): void {
    this.pagination.set(null);
    this._isLoading.set(false);
  }

  search(playerId: string, pageNumber: number = this.currentPage()): void {
    if (this._isLoading()) return;
    this._isLoading.set(true);

    this.playerApiService.searchPlayedTrophySuites(playerId, pageNumber, this.pageSize)
      .pipe(
        map(pagination => {
          const content = [...this.trophySuites(), ...pagination.content];
          return {...pagination, content} as Pagination<PlayedTrophySuiteSearchElement>;
        }),
        finalize(() => this._isLoading.set(false))
      )
      .subscribe({
        next: pagination => this.pagination.set(pagination),
        error: () => {
          console.error(`Failed loading trophy suites for player ${playerId}`);
          this.notificationService.error('Failed to retrieve trophy suites for player');
        }
      });
  }

  loadMore(playerId: string): void {
    this.search(playerId, this.currentPage() + 1);
  }
}
