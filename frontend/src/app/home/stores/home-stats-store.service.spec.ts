import {fakeAsync, flushMicrotasks, TestBed} from '@angular/core/testing';

import {HomeStatsStore} from './home-stats-store.service';
import {PlayerApiService} from "../../core/api/services/player-api.service";
import {TrophyApiService} from "../../core/api/services/trophy-api.service";
import {of} from "rxjs";
import {LoadingStatus} from "../../core/models/loading-status.enum";
import {GameApiService} from "../../core/api/services/game-api.service";

describe('HomeStatsStore', () => {
    let store: HomeStatsStore;

    let playerApiServiceSpy: jasmine.SpyObj<PlayerApiService>;
    let gameApiServiceSpy: jasmine.SpyObj<GameApiService>;
    let trophyApiServiceSpy: jasmine.SpyObj<TrophyApiService>;

    beforeEach(() => {
        playerApiServiceSpy = jasmine.createSpyObj('PlayerApiService', ['count', 'countRecent']);
        gameApiServiceSpy = jasmine.createSpyObj('GameApiService', ['count', 'countRecent']);
        trophyApiServiceSpy = jasmine.createSpyObj('TrophyApiService', ['count', 'countRecentlyEarned']);

        TestBed.configureTestingModule({
            providers: [
                {provide: PlayerApiService, useValue: playerApiServiceSpy},
                {provide: GameApiService, useValue: gameApiServiceSpy},
                {provide: TrophyApiService, useValue: trophyApiServiceSpy},
            ]
        });
        store = TestBed.inject(HomeStatsStore);
    });

    it('should be created', () => expect(store).toBeTruthy());

    it('should update stats when fetched from backend', fakeAsync(() => {
        playerApiServiceSpy.count.and.returnValue(of(10));
        playerApiServiceSpy.countRecent.and.returnValue(of(5));
        gameApiServiceSpy.count.and.returnValue(of(100));
        gameApiServiceSpy.countRecent.and.returnValue(of(50));
        trophyApiServiceSpy.count.and.returnValue(of(1000));
        trophyApiServiceSpy.countRecentlyEarned.and.returnValue(of(500));

        store.fetch();
        flushMicrotasks();

        expect(playerApiServiceSpy.countRecent).toHaveBeenCalled();
        expect(playerApiServiceSpy.count).toHaveBeenCalled();
        expect(gameApiServiceSpy.count).toHaveBeenCalled();
        expect(gameApiServiceSpy.countRecent).toHaveBeenCalled();
        expect(trophyApiServiceSpy.count).toHaveBeenCalled();
        expect(trophyApiServiceSpy.countRecentlyEarned).toHaveBeenCalled();

        expect(store.status()).toEqual(LoadingStatus.FULLY_LOADED);
        expect(store.playerCount()).toEqual(10);
        expect(store.recentPlayerCount()).toEqual(5);
        expect(store.gameCount()).toEqual(100);
        expect(store.recentGameCount()).toEqual(50);
        expect(store.trophyCount()).toEqual(1000);
        expect(store.recentTrophyCount()).toEqual(500);
    }));
});
