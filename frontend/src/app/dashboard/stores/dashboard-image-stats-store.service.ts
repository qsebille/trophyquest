import {Injectable, signal} from '@angular/core';
import {ImageUploadStats} from "../../core/api/dtos/images/image-upload-stats";
import {LoadingStatus} from "../../core/models/loading-status.enum";
import {StatsApiService} from "../../core/api/services/stats-api.service";
import {forkJoin} from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class DashboardImageStatsStoreService {
    private _psnUploads = signal<ImageUploadStats>({uploaded: 0, pending: 0});
    private _igdbUploads = signal<ImageUploadStats>({uploaded: 0, pending: 0});
    private _loadingStatus = signal<LoadingStatus>(LoadingStatus.NONE);

    readonly psnUploads = this._psnUploads.asReadonly();
    readonly igdbUploads = this._igdbUploads.asReadonly();
    readonly loadingStatus = this._loadingStatus.asReadonly();

    constructor(private readonly _statsApiService: StatsApiService) {
    }

    loadStats(): void {
        this._loadingStatus.set(LoadingStatus.LOADING);

        forkJoin({
            psn: this._statsApiService.fetchImageUploadStats('psn'),
            igdb: this._statsApiService.fetchImageUploadStats('igdb'),
        }).subscribe({
            next: (stats) => {
                this._psnUploads.set(stats.psn);
                this._igdbUploads.set(stats.igdb);
                this._loadingStatus.set(LoadingStatus.FULLY_LOADED);
            },
            error: (error) => {
                console.error('Failed to fetch image upload stats:', error);
                this._loadingStatus.set(LoadingStatus.ERROR);
            }
        })
    }
}
