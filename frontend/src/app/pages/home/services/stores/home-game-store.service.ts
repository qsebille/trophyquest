import {inject, Injectable, signal} from '@angular/core';
import {NotificationService} from '../../../../core/services/notification.service';
import {finalize} from 'rxjs';
import {HomeApiService} from '../api/home-api.service';
import {HomeGameItem} from '../../models/home-game-item';

@Injectable({
  providedIn: 'root',
})
export class HomeGameStoreService {
  private readonly homeApiService = inject(HomeApiService);
  private readonly notificationService = inject(NotificationService);

  private readonly _recentGames = signal<HomeGameItem[]>([]);
  private readonly _isLoading = signal<boolean>(false);
  private readonly _hasError = signal<boolean>(false);

  readonly games = this._recentGames.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();
  readonly hasError = this._hasError.asReadonly();

  reset(): void {
    this._recentGames.set([]);
    this._hasError.set(false);
    this._isLoading.set(false);
  }

  fetch(): void {
    if (this.isLoading()) return;
    this._isLoading.set(true);
    this._hasError.set(false);

    this.homeApiService.fetchTopGames(20)
      .pipe(finalize(() => this._isLoading.set(false)))
      .subscribe({
          next: data => this._recentGames.set(data),
          error: error => {
            console.error('Failed to fetch home data', error);
            this.notificationService.error('Failed to retrieve top games');
            this._hasError.set(true);
          }
        },
      );
  }
}
