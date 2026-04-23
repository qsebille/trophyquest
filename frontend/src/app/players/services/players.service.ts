import {computed, inject, Injectable, signal} from '@angular/core';
import {PlayerApiService} from '../../core/api/services/player-api.service';
import {Pagination} from '../../core/api/dtos/pagination';
import {PlayerSearchItem} from '../../core/api/dtos/player/player-search-item';
import {finalize} from 'rxjs';
import {NotificationService} from '../../core/services/notification.service';

@Injectable({
  providedIn: 'root',
})
export class PlayersService {
  private readonly playerApiService: PlayerApiService = inject(PlayerApiService);
  private readonly notificationService = inject(NotificationService);
  private readonly pageSize = 20;
  private readonly _pagination = signal<Pagination<PlayerSearchItem> | null>(null);
  private readonly _isLoading = signal<boolean>(false);

  readonly pagination = computed(() => this._pagination() ?? {
    content: [],
    page: 0,
    total: 0,
    size: this.pageSize
  } as Pagination<PlayerSearchItem>);
  readonly isLoading = this._isLoading.asReadonly();

  reset(): void {
    this._pagination.set(null);
    this._isLoading.set(false);
  }

  search(page: number): void {
    if (this.isLoading()) return;
    this._isLoading.set(true);

    this.playerApiService.search(page, this.pageSize)
      .pipe(finalize(() => this._isLoading.set(false)))
      .subscribe({
        next: pagination => this._pagination.set(pagination),
        error: error => {
          console.error('Failed to load players' + error);
          this.notificationService.error('Failed to retrieve player list');
        },
      });
  }
}
