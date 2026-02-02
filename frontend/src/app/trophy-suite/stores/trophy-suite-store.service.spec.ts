import {fakeAsync, TestBed} from '@angular/core/testing';

import {TrophySuiteStoreService} from './trophy-suite-store.service';
import {TrophySuiteApiService} from "../../core/api/services/trophy-suite-api.service";
import {TrophySuite} from "../../core/api/dtos/trophy-suite/trophy-suite";
import {of} from "rxjs";
import {EarnedTrophy} from "../../core/api/dtos/trophy/earned-trophy";
import {LoadingStatus} from "../../core/models/loading-status.enum";

describe('TrophySuiteStoreService', () => {
    let service: TrophySuiteStoreService;

    let trophySuiteApiServiceSpy: jasmine.SpyObj<TrophySuiteApiService>;

    beforeEach(() => {
        trophySuiteApiServiceSpy = jasmine.createSpyObj('TrophySuiteApiService', ['fetch', 'fetchTrophies']);
        TestBed.configureTestingModule({
            providers: [{provide: TrophySuiteApiService, useValue: trophySuiteApiServiceSpy}]
        });
        service = TestBed.inject(TrophySuiteStoreService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should retrieve information about trophy suite', fakeAsync(() => {
        const mockTrophySuiteId = 'trophy-suite-123';
        const mockPlayerId = 'player-123';
        const mockTrophySuite = {id: mockTrophySuiteId, title: 'Mock Trophy Suite'} as TrophySuite;
        const mockEarnedTrophies = [
            {id: 'trophy-1', title: 'Trophy 1'} as EarnedTrophy,
            {id: 'trophy-1', title: 'Trophy 1'} as EarnedTrophy,
        ];
        trophySuiteApiServiceSpy.fetch.and.returnValue(of(mockTrophySuite));
        trophySuiteApiServiceSpy.fetchTrophies.and.returnValue(of(mockEarnedTrophies));

        service.retrieve(mockTrophySuiteId, mockPlayerId);

        expect(trophySuiteApiServiceSpy.fetch).toHaveBeenCalledWith(mockTrophySuiteId);
        expect(trophySuiteApiServiceSpy.fetchTrophies).toHaveBeenCalledWith(mockTrophySuiteId, mockPlayerId);
        expect(service.trophySuite()).toEqual(mockTrophySuite);
        expect(service.trophies()).toEqual(mockEarnedTrophies);
        expect(service.status()).toEqual(LoadingStatus.FULLY_LOADED);
    }));
});
