import {Component, computed} from '@angular/core';
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
    readonly isLoading = computed(() => {
        return [
            this._dashboardIgdbStore.loadingStatus(),
            this._dashboardImageUploadStore.loadingStatus(),
        ].some(status => status === LoadingStatus.LOADING)
    });
    readonly hasFailedLoading = computed(() => {
        return [
            this._dashboardIgdbStore.loadingStatus(),
            this._dashboardImageUploadStore.loadingStatus(),
        ].some(status => status === LoadingStatus.ERROR)
    });
    readonly igdbMappingStats = computed(() => this._dashboardIgdbStore.igdbMappingStats());
    readonly imageUploadStats = computed(() => this._dashboardImageUploadStore.uploads());


    constructor(
        private readonly _dashboardIgdbStore: DashboardIgdbStatsStoreService,
        private readonly _dashboardImageUploadStore: DashboardImageStatsStoreService,
    ) {
    }

    ngOnInit() {
        this._dashboardIgdbStore.fetchStats();
        this._dashboardImageUploadStore.loadStats();
    }
}
