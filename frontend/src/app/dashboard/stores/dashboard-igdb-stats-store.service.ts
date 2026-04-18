import {inject, Injectable, signal} from '@angular/core';
import {EMPTY_IGDB_MAPPING_STATS, IgdbMappingStats} from "../../core/api/dtos/igdb/igdb-mapping-stats";
import {IgdbMappingApiService} from "../../core/api/services/igdb-mapping-api.service";
import {LoadingStatus} from "../../core/models/loading-status.enum";

@Injectable({
  providedIn: 'root',
})
export class DashboardIgdbStatsStoreService {
  private readonly igdbMappingApiService: IgdbMappingApiService = inject(IgdbMappingApiService)
  private _loadingStatus = signal<LoadingStatus>(LoadingStatus.NONE);
  private _igdbMappingStats = signal<IgdbMappingStats>(EMPTY_IGDB_MAPPING_STATS);

  readonly loadingStatus = this._loadingStatus.asReadonly();
  readonly igdbMappingStats = this._igdbMappingStats.asReadonly();

  fetchStats(): void {
    this._loadingStatus.set(LoadingStatus.LOADING);
    this.igdbMappingApiService.fetchStats()
      .subscribe({
        next: stats => {
          this._igdbMappingStats.set(stats);
          this._loadingStatus.set(LoadingStatus.FULLY_LOADED);
        },
        error: error => {
          console.error('Failed to fetch igdb mapping stats', error);
          this._loadingStatus.set(LoadingStatus.ERROR);
        }
      });
  }
}
