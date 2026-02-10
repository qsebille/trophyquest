import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DashboardPageComponent} from './dashboard-page.component';
import {DashboardStoreService} from "../../stores/dashboard-store.service";
import {LoadingStatus} from "../../../core/models/loading-status.enum";
import {EMPTY_IGDB_MAPPING_STATS} from "../../../core/api/dtos/igdb/igdb-mapping-stats";

describe('DashboardPageComponent', () => {
    let component: DashboardPageComponent;
    let fixture: ComponentFixture<DashboardPageComponent>;

    let dashboardStoreServiceSpy: jasmine.SpyObj<DashboardStoreService>;

    beforeEach(async () => {
        dashboardStoreServiceSpy = jasmine.createSpyObj('DashboardStoreService', [
            'fetchStats',
            'loadingStatus',
            'igdbMappingStats'
        ]);
        await TestBed.configureTestingModule({
            imports: [DashboardPageComponent],
            providers: [{provide: DashboardStoreService, useValue: dashboardStoreServiceSpy}]
        })
            .compileComponents();

        dashboardStoreServiceSpy.loadingStatus.and.returnValue(LoadingStatus.FULLY_LOADED);
        dashboardStoreServiceSpy.igdbMappingStats.and.returnValue(EMPTY_IGDB_MAPPING_STATS);
        fixture = TestBed.createComponent(DashboardPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
