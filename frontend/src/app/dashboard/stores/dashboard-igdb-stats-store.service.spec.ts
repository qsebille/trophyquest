import {TestBed} from '@angular/core/testing';

import {DashboardIgdbStatsStoreService} from './dashboard-igdb-stats-store.service';
import {IgdbMappingApiService} from "../../core/api/services/igdb-mapping-api.service";

describe('DashboardIgdbStatsStoreService', () => {
    let service: DashboardIgdbStatsStoreService;

    let igdbMappingApiServiceSpy: jasmine.SpyObj<IgdbMappingApiService>;

    beforeEach(() => {
        igdbMappingApiServiceSpy = jasmine.createSpyObj('IgdbMappingApiService', ['fetchStats']);
        TestBed.configureTestingModule({
            providers: [{provide: IgdbMappingApiService, useValue: igdbMappingApiServiceSpy}]
        });
        service = TestBed.inject(DashboardIgdbStatsStoreService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
