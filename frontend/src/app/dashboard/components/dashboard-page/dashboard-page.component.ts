import {Component, computed, inject} from '@angular/core';
import {DashboardIgdbStatsStoreService} from "../../stores/dashboard-igdb-stats-store.service";
import {LoadingStatus} from "../../../core/models/loading-status.enum";
import {SpinnerContainerComponent} from "../../../core/components/spinner-container/spinner-container.component";
import {ErrorMessageComponent} from "../../../core/components/error-message/error-message.component";
import {DashboardIgdbMappingComponent} from "../dashboard-igdb-mapping/dashboard-igdb-mapping.component";
import {DashboardImageUploadComponent} from "../dashboard-image-upload/dashboard-image-upload.component";
import {DashboardImageStatsStoreService} from "../../stores/dashboard-image-stats-store.service";

@Component({
  selector: 'tq-dashboard-page',
  imports: [
    SpinnerContainerComponent,
    ErrorMessageComponent,
    DashboardIgdbMappingComponent,
    DashboardImageUploadComponent,
    DashboardImageUploadComponent
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
})
export class DashboardPageComponent {
  private readonly dashboardIgdbStore: DashboardIgdbStatsStoreService = inject(DashboardIgdbStatsStoreService);
  private readonly dashboardImageUploadStore: DashboardImageStatsStoreService = inject(DashboardImageStatsStoreService);

  readonly isLoading = computed(() => {
    return [
      this.dashboardIgdbStore.loadingStatus(),
      this.dashboardImageUploadStore.loadingStatus(),
    ].some(status => status === LoadingStatus.LOADING)
  });
  readonly hasFailedLoading = computed(() => {
    return [
      this.dashboardIgdbStore.loadingStatus(),
      this.dashboardImageUploadStore.loadingStatus(),
    ].some(status => status === LoadingStatus.ERROR)
  });
  readonly igdbMappingStats = this.dashboardIgdbStore.igdbMappingStats;
  readonly imageUploadStats = this.dashboardImageUploadStore.uploads;


  ngOnInit(): void {
    this.dashboardIgdbStore.fetchStats();
    this.dashboardImageUploadStore.loadStats();
  }
}
