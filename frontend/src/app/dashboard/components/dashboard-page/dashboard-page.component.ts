import {Component, inject} from '@angular/core';
import {SpinnerContainerComponent} from "../../../core/components/spinner-container/spinner-container.component";
import {DashboardIgdbMappingComponent} from "../dashboard-igdb-mapping/dashboard-igdb-mapping.component";
import {DashboardImageUploadComponent} from "../dashboard-image-upload/dashboard-image-upload.component";
import {DashboardService} from '../../services/dashboard.service';

@Component({
  selector: 'tq-dashboard-page',
  imports: [
    SpinnerContainerComponent,
    DashboardIgdbMappingComponent,
    DashboardImageUploadComponent,
    DashboardImageUploadComponent
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
})
export class DashboardPageComponent {
  private readonly dashboardService = inject(DashboardService);

  readonly isLoading = this.dashboardService.isLoading;
  readonly igdbMappingStats = this.dashboardService.igdbMappingStats;
  readonly imageUploadStats = this.dashboardService.uploadStats;


  ngOnInit(): void {
    this.dashboardService.fetchData();
  }
}
