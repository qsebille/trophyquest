import {TestBed} from '@angular/core/testing';

import {DashboardImageStatsStoreService} from './dashboard-image-stats-store.service';
import {StatsApiService} from "../../core/api/services/stats-api.service";

describe('DashboardImageStatsStoreService', () => {
    let service: DashboardImageStatsStoreService;

    let statsApiServiceSpy: jasmine.SpyObj<StatsApiService>;

    beforeEach(() => {
        statsApiServiceSpy = jasmine.createSpyObj('StatsApiService', ['fetchImageUploadStats']);
        TestBed.configureTestingModule({
            providers: [{provide: StatsApiService, useValue: statsApiServiceSpy}]
        });
        service = TestBed.inject(DashboardImageStatsStoreService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
