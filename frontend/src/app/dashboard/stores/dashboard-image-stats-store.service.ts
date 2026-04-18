import {computed, inject, Injectable, signal} from '@angular/core';
import {ImageUploadStats} from "../../core/api/dtos/images/image-upload-stats";
import {LoadingStatus} from "../../core/models/loading-status.enum";
import {StatsApiService} from "../../core/api/services/stats-api.service";
import {forkJoin} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class DashboardImageStatsStoreService {
  private readonly statsApiService: StatsApiService = inject(StatsApiService);
  private readonly _gameImageUploads = signal<ImageUploadStats>({uploaded: 0, pending: 0});
  private readonly _playerAvatarUploads = signal<ImageUploadStats>({uploaded: 0, pending: 0});
  private readonly _trophyIconUploads = signal<ImageUploadStats>({uploaded: 0, pending: 0});
  private readonly _trophySuiteImageUploads = signal<ImageUploadStats>({uploaded: 0, pending: 0});
  private readonly _igdbImageUploads = signal<ImageUploadStats>({uploaded: 0, pending: 0});
  private readonly _loadingStatus = signal<LoadingStatus>(LoadingStatus.NONE);

  readonly loadingStatus = this._loadingStatus.asReadonly();
  readonly uploads = computed(() => ({
    game: this._gameImageUploads.asReadonly(),
    player: this._playerAvatarUploads.asReadonly(),
    trophy: this._trophyIconUploads.asReadonly(),
    trophySuite: this._trophySuiteImageUploads.asReadonly(),
    igdb: this._igdbImageUploads.asReadonly(),
  }));

  loadStats(): void {
    this._loadingStatus.set(LoadingStatus.LOADING);

    forkJoin({
      game: this.statsApiService.fetchImageUploadStats('game'),
      player: this.statsApiService.fetchImageUploadStats('player'),
      trophy: this.statsApiService.fetchImageUploadStats('trophy'),
      trophySuite: this.statsApiService.fetchImageUploadStats('trophySuite'),
      igdb: this.statsApiService.fetchImageUploadStats('igdb'),
    }).subscribe({
      next: (stats) => {
        this._gameImageUploads.set(stats.game);
        this._playerAvatarUploads.set(stats.player);
        this._trophyIconUploads.set(stats.trophy);
        this._trophySuiteImageUploads.set(stats.trophySuite);
        this._igdbImageUploads.set(stats.igdb);
        this._loadingStatus.set(LoadingStatus.FULLY_LOADED);
      },
      error: (error) => {
        console.error('Failed to fetch image upload stats:', error);
        this._loadingStatus.set(LoadingStatus.ERROR);
      }
    })
  }
}
