import {TestBed} from '@angular/core/testing';

import {DashboardStoreService} from './dashboard-store.service';
import {IgdbMappingApiService} from "../../core/api/services/igdb-mapping-api.service";

describe('DashboardStoreService', () => {
    let service: DashboardStoreService;

    let igdbMappingApiServiceSpy: jasmine.SpyObj<IgdbMappingApiService>;

    beforeEach(() => {
        igdbMappingApiServiceSpy = jasmine.createSpyObj('IgdbMappingApiService', ['fetchStats']);
        TestBed.configureTestingModule({
            providers: [{provide: IgdbMappingApiService, useValue: igdbMappingApiServiceSpy}]
        });
        service = TestBed.inject(DashboardStoreService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
