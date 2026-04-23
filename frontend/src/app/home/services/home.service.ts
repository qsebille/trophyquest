import {computed, inject, Injectable, signal} from '@angular/core';
import {GameApiService} from '../../core/api/services/game-api.service';
import {PlayerApiService} from '../../core/api/services/player-api.service';
import {TrophyApiService} from '../../core/api/services/trophy-api.service';
import {NotificationService} from '../../core/services/notification.service';
import {HomeStatsData} from '../models/home-stats-data';
import {TopRecentPlayerRow} from '../../core/api/dtos/player/top-recent-player-row';
import {RecentGame} from '../../core/api/dtos/game/recent-game';
import {finalize, forkJoin} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private readonly playerApiService = inject(PlayerApiService);
  private readonly gameApiService = inject(GameApiService);
  private readonly trophyApiService = inject(TrophyApiService);
  private readonly notificationService = inject(NotificationService);

  private readonly _stats = signal<HomeStatsData | null>(null);
  private readonly _topPlayers = signal<TopRecentPlayerRow[]>([]);
  private readonly _recentGames = signal<RecentGame[]>([]);
  private readonly _isLoading = signal<boolean>(false);

  readonly stats = computed(() => this._stats() ?? {
    total: {game: 0, player: 0, trophy: 0},
    lastWeek: {game: 0, player: 0, trophy: 0},
  });
  readonly topPlayers = this._topPlayers.asReadonly();
  readonly recentGames = this._recentGames.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();

  reset(): void {
    this._stats.set(null);
    this._topPlayers.set([]);
    this._recentGames.set([]);
    this._isLoading.set(false);
  }

  fetchData(): void {
    if (this._isLoading()) return;
    this._isLoading.set(true);

    forkJoin({
      playerCount: this.playerApiService.count(),
      gameCount: this.gameApiService.count(),
      trophyCount: this.trophyApiService.count(),
      recentPlayerCount: this.playerApiService.countRecent(),
      recentGameCount: this.gameApiService.countRecent(),
      recentTrophyCount: this.trophyApiService.countRecentlyEarned(),
      topPlayers: this.playerApiService.fetchTopRecent(),
      recentGames: this.gameApiService.searchRecent(0, 20),
    })
      .pipe(finalize(() => this._isLoading.set(false)))
      .subscribe({
          next: data => {
            this._stats.set({
              total: {
                game: data.gameCount,
                player: data.playerCount,
                trophy: data.trophyCount,
              },
              lastWeek: {
                game: data.recentGameCount,
                player: data.recentPlayerCount,
                trophy: data.recentTrophyCount,
              }
            });
            this._topPlayers.set(data.topPlayers);
            this._recentGames.set(data.recentGames.content);
          },
          error: error => {
            console.error('Failed to fetch data:', error);
            this.notificationService.error('Failed to retrieve data');
          }
        },
      );
  }
}
