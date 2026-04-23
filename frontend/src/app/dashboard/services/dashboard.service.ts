import {computed, inject, Injectable, signal} from '@angular/core';
import {IgdbMappingApiService} from '../../core/api/services/igdb-mapping-api.service';
import {NotificationService} from '../../core/services/notification.service';
import {StatsApiService} from '../../core/api/services/stats-api.service';
import {IgdbMappingStats} from '../../core/api/dtos/igdb/igdb-mapping-stats';
import {finalize, forkJoin} from 'rxjs';
import {ImageUploadStats} from '../../core/api/dtos/images/image-upload-stats';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly igdbMappingApiService = inject(IgdbMappingApiService);
  private readonly statsApiService: StatsApiService = inject(StatsApiService);
  private readonly notificationService = inject(NotificationService);

  private readonly _igdbMappingStats = signal<IgdbMappingStats | null>(null);
  private readonly _gameImageUploads = signal<ImageUploadStats>({uploaded: 0, pending: 0});
  private readonly _playerAvatarUploads = signal<ImageUploadStats>({uploaded: 0, pending: 0});
  private readonly _trophyIconUploads = signal<ImageUploadStats>({uploaded: 0, pending: 0});
  private readonly _trophySuiteImageUploads = signal<ImageUploadStats>({uploaded: 0, pending: 0});
  private readonly _igdbImageUploads = signal<ImageUploadStats>({uploaded: 0, pending: 0});
  private readonly _isLoading = signal<boolean>(false);

  readonly uploadStats = computed(() => ({
    game: this._gameImageUploads.asReadonly(),
    player: this._playerAvatarUploads.asReadonly(),
    trophy: this._trophyIconUploads.asReadonly(),
    trophySuite: this._trophySuiteImageUploads.asReadonly(),
    igdb: this._igdbImageUploads.asReadonly(),
  }));
  readonly igdbMappingStats = computed(() => this._igdbMappingStats() ?? {
    pending: 0,
    validationRequired: 0,
    noFoundCandidate: 0,
    allRefused: 0,
    matched: 0,
  } as IgdbMappingStats);
  readonly isLoading = this._isLoading.asReadonly();

  fetchData(): void {
    if (this._isLoading()) return;
    this._isLoading.set(true);

    forkJoin({
      igdbMapping: this.igdbMappingApiService.fetchStats(),
      gameImagesUpload: this.statsApiService.fetchImageUploadStats('game'),
      playerImagesUpload: this.statsApiService.fetchImageUploadStats('player'),
      trophyImagesUpload: this.statsApiService.fetchImageUploadStats('trophy'),
      trophySuiteImagesUpload: this.statsApiService.fetchImageUploadStats('trophySuite'),
      igdbImagesUpload: this.statsApiService.fetchImageUploadStats('igdb'),
    })
      .pipe(finalize(() => this._isLoading.set(false)))
      .subscribe({
        next: stats => {
          this._igdbMappingStats.set(stats.igdbMapping);
          this._gameImageUploads.set(stats.gameImagesUpload);
          this._playerAvatarUploads.set(stats.playerImagesUpload);
          this._trophyIconUploads.set(stats.trophyImagesUpload);
          this._trophySuiteImageUploads.set(stats.trophySuiteImagesUpload);
          this._igdbImageUploads.set(stats.igdbImagesUpload);
        },
        error: error => {
          console.error('Failed to fetch data:', error);
          this.notificationService.error('Failed to retrieve dashboard data.');
        }
      })
  }
}
