import {computed, inject, Injectable, signal} from '@angular/core';
import {finalize} from "rxjs";
import {PlayerApiService} from "../../core/api/services/player-api.service";
import {NotificationService} from '../../core/services/notification.service';
import {emptyPlayerSearchItem, PlayerSearchItem} from '../../core/api/dtos/player/player-search-item';

@Injectable({
  providedIn: 'root',
})
export class ProfileSummaryStore {
  private readonly playerApiService = inject(PlayerApiService);
  private readonly notificationService = inject(NotificationService);
  private readonly _player = signal<PlayerSearchItem | null>(null);
  private readonly _isLoading = signal<boolean>(false);

  readonly player = computed(() => this._player() ?? emptyPlayerSearchItem);
  readonly isLoading = this._isLoading.asReadonly();

  reset(): void {
    this._player.set(null);
    this._isLoading.set(false);
  }

  retrieve(playerId: string): void {
    if (this._isLoading()) return;
    this._isLoading.set(true);
    this.playerApiService.fetch(playerId)
      .pipe(finalize(() => this._isLoading.set(false)))
      .subscribe({
        next: player => this._player.set(player),
        error: error => {
          console.error(error);
          this.notificationService.error('Failed to retrieve player profile');
        }
      });
  }
}
