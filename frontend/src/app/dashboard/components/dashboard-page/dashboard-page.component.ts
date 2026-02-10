import {Component, computed} from '@angular/core';
import {DashboardStoreService} from "../../stores/dashboard-store.service";
import {LoadingStatus} from "../../../core/models/loading-status.enum";
import {SpinnerContainerComponent} from "../../../core/components/spinner-container/spinner-container.component";
import {ErrorMessageComponent} from "../../../core/components/error-message/error-message.component";
import {DashboardIgdbMappingComponent} from "../dashboard-igdb-mapping/dashboard-igdb-mapping.component";

@Component({
    selector: 'tq-dashboard-page',
    imports: [
        SpinnerContainerComponent,
        ErrorMessageComponent,
        DashboardIgdbMappingComponent
    ],
    templateUrl: './dashboard-page.component.html',
    styleUrl: './dashboard-page.component.scss',
})
export class DashboardPageComponent {

    readonly igdbMappingStats = computed(() => this._dashboardStoreService.igdbMappingStats());
    readonly isLoading = computed(() => this._dashboardStoreService.loadingStatus() === LoadingStatus.LOADING);
    readonly hasFailedLoading = computed(() => this._dashboardStoreService.loadingStatus() === LoadingStatus.ERROR);

    constructor(private _dashboardStoreService: DashboardStoreService) {
    }

    ngOnInit() {
        this._dashboardStoreService.fetchStats();
    }

}
