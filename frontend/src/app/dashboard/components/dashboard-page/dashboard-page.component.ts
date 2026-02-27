import {Component, computed} from '@angular/core';
import {DashboardStoreService} from "../../stores/dashboard-store.service";
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
    readonly isLoading = computed(() => {
        return [
            this._dashboardStoreService.loadingStatus(),
            this._dashboardImageUploadService.loadingStatus(),
        ].some(status => status === LoadingStatus.LOADING)
    });
    readonly hasFailedLoading = computed(() => {
        return [
            this._dashboardStoreService.loadingStatus(),
            this._dashboardImageUploadService.loadingStatus(),
        ].some(status => status === LoadingStatus.ERROR)
    });
    readonly igdbMappingStats = computed(() => this._dashboardStoreService.igdbMappingStats());
    readonly imageUploadStats = {
        psn: computed(() => this._dashboardImageUploadService.psnUploads()),
        igdb: computed(() => this._dashboardImageUploadService.igdbUploads()),
    }


    constructor(
        private readonly _dashboardStoreService: DashboardStoreService,
        private readonly _dashboardImageUploadService: DashboardImageStatsStoreService,
    ) {
    }

    ngOnInit() {
        this._dashboardStoreService.fetchStats();
        this._dashboardImageUploadService.loadStats();
    }
}
