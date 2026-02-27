import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DashboardPageComponent} from './dashboard-page.component';
import {DashboardIgdbStatsStoreService} from "../../stores/dashboard-igdb-stats-store.service";
import {LoadingStatus} from "../../../core/models/loading-status.enum";
import {EMPTY_IGDB_MAPPING_STATS} from "../../../core/api/dtos/igdb/igdb-mapping-stats";
import {DashboardImageStatsStoreService} from "../../stores/dashboard-image-stats-store.service";

describe('DashboardPageComponent', () => {
    let component: DashboardPageComponent;
    let fixture: ComponentFixture<DashboardPageComponent>;

    let dashboardIgdbStoreSpy: jasmine.SpyObj<DashboardIgdbStatsStoreService>;
    let dashboardImageStoreSpy: jasmine.SpyObj<DashboardImageStatsStoreService>;

    beforeEach(async () => {
        dashboardIgdbStoreSpy = jasmine.createSpyObj('DashboardIgdbStatsStoreService', [
            'fetchStats',
            'loadingStatus',
            'igdbMappingStats'
        ]);
        dashboardImageStoreSpy = jasmine.createSpyObj('DashboardImageStatsStoreService', [
            'loadStats',
            'loadingStatus',
            'psnUploads',
            'igdbUploads',
        ]);
        await TestBed.configureTestingModule({
            imports: [DashboardPageComponent],
            providers: [
                {provide: DashboardIgdbStatsStoreService, useValue: dashboardIgdbStoreSpy},
                {provide: DashboardImageStatsStoreService, useValue: dashboardImageStoreSpy},
            ]
        })
            .compileComponents();

        dashboardIgdbStoreSpy.loadingStatus.and.returnValue(LoadingStatus.FULLY_LOADED);
        dashboardIgdbStoreSpy.igdbMappingStats.and.returnValue(EMPTY_IGDB_MAPPING_STATS);
        dashboardImageStoreSpy.psnUploads.and.returnValue({pending: 0, uploaded: 0});
        dashboardImageStoreSpy.igdbUploads.and.returnValue({pending: 0, uploaded: 0});

        fixture = TestBed.createComponent(DashboardPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
