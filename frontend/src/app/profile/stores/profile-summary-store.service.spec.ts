import {fakeAsync, flushMicrotasks, TestBed} from '@angular/core/testing';

import {ProfileSummaryStore} from './profile-summary-store.service';
import {PlayerApiService} from "../../core/api/services/player-api.service";
import {EMPTY_PLAYER, Player} from "../../core/api/dtos/player/player";
import {of} from "rxjs";
import {LoadingStatus} from "../../core/models/loading-status.enum";
import {PlayerStats} from "../../core/api/dtos/player/player-stats";

describe('ProfileSummaryStore', () => {
    let store: ProfileSummaryStore;

    let playerApiServiceSpy: jasmine.SpyObj<PlayerApiService>;

    beforeEach(() => {
        playerApiServiceSpy = jasmine.createSpyObj('PlayerApiService', ['fetch', 'fetchStats']);
        TestBed.configureTestingModule({
            providers: [{provide: PlayerApiService, useValue: playerApiServiceSpy}]
        });
        store = TestBed.inject(ProfileSummaryStore);
    });

    it('should be created', () => {
        expect(store).toBeTruthy();
        expect(store.player()).toEqual(EMPTY_PLAYER);
        expect(store.status()).toEqual(LoadingStatus.NONE);
    });

    it('should load player summary when retrieve is called', fakeAsync(() => {
        const mockPlayerId = 'player-123';
        const mockPlayer: Player = {id: mockPlayerId, pseudo: 'John Doe', avatar: 'avatar.png'};
        const mockPlayerStats: PlayerStats = {
            totalTrophySuitesPlayed: 1,
            totalPlatinumTrophies: 2,
            totalGoldTrophies: 3,
            totalSilverTrophies: 4,
            totalBronzeTrophies: 5
        };

        playerApiServiceSpy.fetch.and.returnValue(of(mockPlayer));
        playerApiServiceSpy.fetchStats.and.returnValue(of(mockPlayerStats));

        store.retrieve(mockPlayerId);
        flushMicrotasks();

        expect(store.player()).toEqual(mockPlayer);
        expect(store.playerStats()).toEqual(mockPlayerStats);
        expect(store.status()).toEqual(LoadingStatus.FULLY_LOADED);
    }));
});
