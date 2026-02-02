import {fakeAsync, flushMicrotasks, TestBed} from '@angular/core/testing';

import {PlayerApiService} from "../../core/api/services/player-api.service";
import {LoadingStatus} from "../../core/models/loading-status.enum";
import {ProfileTrophySuiteListStoreService} from "./profile-trophy-suite-list-store.service";
import {of} from "rxjs";
import {PlayedTrophySuiteSearchElement} from "../../core/api/dtos/trophy-suite/played-trophy-suite-search-element";

describe('ProfileTrophySuiteListStoreService', () => {
    let store: ProfileTrophySuiteListStoreService;

    let playerApiServiceSpy: jasmine.SpyObj<PlayerApiService>;

    beforeEach(() => {
        playerApiServiceSpy = jasmine.createSpyObj('PlayerApiService', ['searchPlayedTrophySuites']);
        TestBed.configureTestingModule({
            providers: [{provide: PlayerApiService, useValue: playerApiServiceSpy}]
        });
        store = TestBed.inject(ProfileTrophySuiteListStoreService);
    });

    it('should be created', () => {
        expect(store).toBeTruthy();
        expect(store.status()).toEqual(LoadingStatus.NONE);
    });

    it('should search for trophy suites played by player', fakeAsync(() => {
        const mockPlayerId = 'player-123';
        const mockSearchResult = {
            content: [
                {id: 'trophy-suite-1', name: 'Trophy suite 1'} as PlayedTrophySuiteSearchElement,
                {id: 'trophy-suite-2', name: 'Trophy suite 2'} as PlayedTrophySuiteSearchElement,
            ],
            total: 10
        };
        playerApiServiceSpy.searchPlayedTrophySuites.and.returnValue(of(mockSearchResult));

        store.search(mockPlayerId);
        flushMicrotasks();

        expect(playerApiServiceSpy.searchPlayedTrophySuites).toHaveBeenCalledWith(mockPlayerId, 0, 20)
        expect(store.status()).toEqual(LoadingStatus.PARTIALLY_LOADED);
        expect(store.trophySuites()).toEqual(mockSearchResult.content);
    }));
});
