import {inject, Injectable, signal} from '@angular/core';
import {NotificationService} from '../../../../core/services/notification.service';
import {finalize, forkJoin} from 'rxjs';
import {HomeApiService} from '../api/home-api.service';
import {HomePlayerItem} from '../../models/home-player-item';

@Injectable({
  providedIn: 'root',
})
export class HomePlayerStoreService {
  private readonly homeApiService = inject(HomeApiService);
  private readonly notificationService = inject(NotificationService);

  private readonly _players = signal<HomePlayerItem[]>([]);
  private readonly _isLoading = signal<boolean>(false);
  private readonly _isError = signal<boolean>(false);

  readonly players = this._players.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();
  readonly hasError = this._isError.asReadonly();

  reset(): void {
    this._players.set([]);
    this._isError.set(false);
    this._isLoading.set(false);
  }

  fetch(): void {
    if (this.isLoading()) return;
    this._isLoading.set(true);
    this._isError.set(false);

    forkJoin({
      topPlayers: this.homeApiService.fetchTopPlayers(10),
    })
      .pipe(finalize(() => this._isLoading.set(false)))
      .subscribe({
          next: data => this._players.set(data.topPlayers),
          error: error => {
            console.error('Failed to fetch recent players', error);
            this._isError.set(true);
            this.notificationService.error('Failed to fetch recent players');
          }
        },
      );
  }
}
