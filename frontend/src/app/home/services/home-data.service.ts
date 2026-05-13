import {inject, Injectable, signal} from '@angular/core';
import {PlayerApiService} from '../../core/api/services/player-api.service';
import {GameApiService} from '../../core/api/services/game-api.service';
import {NotificationService} from '../../core/services/notification.service';
import {ActivePlayerTrophy} from '../../core/api/dtos/player/active-player-trophy';
import {RecentGame} from '../../core/api/dtos/game/recent-game';
import {finalize, forkJoin} from 'rxjs';

@Injectable()
export class HomeDataService {
  private readonly playerApiService = inject(PlayerApiService);
  private readonly gameApiService = inject(GameApiService);
  private readonly notificationService = inject(NotificationService);

  private readonly _topActivePlayerTrophies = signal<ActivePlayerTrophy[]>([]);
  private readonly _recentGames = signal<RecentGame[]>([]);
  private readonly _isLoading = signal<boolean>(false);
  private readonly _isError = signal<boolean>(false);

  readonly topActivePlayerTrophies = this._topActivePlayerTrophies.asReadonly();
  readonly recentGames = this._recentGames.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();
  readonly isError = this._isError.asReadonly();

  reset(): void {
    this._topActivePlayerTrophies.set([]);
    this._recentGames.set([]);
    this._isError.set(false);
    this._isLoading.set(false);
  }

  fetchData(): void {
    if (this.isLoading()) return;
    this._isLoading.set(true);
    this._isError.set(false);

    forkJoin({
      topPlayers: this.playerApiService.fetchTopActive(),
      recentGames: this.gameApiService.searchRecent(0, 20),
    })
      .pipe(finalize(() => this._isLoading.set(false)))
      .subscribe({
          next: data => {
            this._topActivePlayerTrophies.set(data.topPlayers);
            this._recentGames.set(data.recentGames.content);
          },
          error: error => {
            console.error('Failed to fetch home data', error);
            this._isError.set(true);
            this.notificationService.error('Failed to retrieve data');
          }
        },
      );
  }
}
