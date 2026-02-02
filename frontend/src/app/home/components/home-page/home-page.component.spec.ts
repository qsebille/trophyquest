import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HomePageComponent} from './home-page.component';
import {NavigatorService} from "../../../core/services/navigator.service";
import {HomeStatsStore} from "../../stores/home-stats-store.service";
import {HomeRecentPlayersStore} from "../../stores/home-recent-players-store.service";
import {HomeRecentGamesStore} from "../../stores/home-recent-games-store.service";

describe('HomePageComponent', () => {
    let component: HomePageComponent;
    let fixture: ComponentFixture<HomePageComponent>;

    let statsStoreSpy: jasmine.SpyObj<HomeStatsStore>;
    let recentPlayersStoreSpy: jasmine.SpyObj<HomeRecentPlayersStore>;
    let recentGameStoreSpy: jasmine.SpyObj<HomeRecentGamesStore>;
    let navigatorSpy: jasmine.SpyObj<NavigatorService>;

    const gameId: string = 'game-123';
    const playerId: string = 'player-123';

    beforeEach(async () => {
        statsStoreSpy = jasmine.createSpyObj('HomeStatsStore', [
            'fetch',
            'playerCount',
            'gameCount',
            'trophyCount',
            'recentPlayerCount',
            'recentGameCount',
            'recentTrophyCount',
            'status',
        ]);
        recentPlayersStoreSpy = jasmine.createSpyObj('HomeRecentPlayersStore', [
            'reset',
            'fetch',
            'players',
            'status',
        ]);
        recentGameStoreSpy = jasmine.createSpyObj('HomeRecentGamesStore', [
            'reset',
            'fetch',
            'recentGames',
            'total',
            'status',
        ]);
        navigatorSpy = jasmine.createSpyObj('NavigatorService', [
            'goToPlayersPage',
            'goToProfilePage',
            'goToTrophySuitePage',
            'goToPlayerTrophySuitePage',
        ]);

        recentPlayersStoreSpy.players.and.returnValue([]);

        await TestBed.configureTestingModule({}).compileComponents();

        TestBed.overrideComponent(HomePageComponent, {
            set: {
                providers: [
                    {provide: HomeStatsStore, useValue: statsStoreSpy},
                    {provide: HomeRecentPlayersStore, useValue: recentPlayersStoreSpy},
                    {provide: HomeRecentGamesStore, useValue: recentGameStoreSpy},
                    {provide: NavigatorService, useValue: navigatorSpy},
                ],
            }
        });

        fixture = TestBed.createComponent(HomePageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => expect(component).toBeTruthy());

    it('should fetch store data on init', () => {
        expect(statsStoreSpy.fetch).toHaveBeenCalled();
        expect(recentPlayersStoreSpy.fetch).toHaveBeenCalled();
    });

    it('should navigate to players page', () => {
        component.navigateToPlayersPage();
        expect(navigatorSpy.goToPlayersPage).toHaveBeenCalled();
    });

    it('should navigate to profile page', () => {
        component.navigateToProfilePage(playerId);
        expect(navigatorSpy.goToProfilePage).toHaveBeenCalledOnceWith(playerId);
    });

    it('should navigate to game page', () => {
        component.navigateToTrophySuitePage(gameId);
        expect(navigatorSpy.goToTrophySuitePage).toHaveBeenCalledWith(gameId);
    });

    it('should navigate to player game page', () => {
        component.navigateToPlayerTrophySuitePage(gameId, playerId);
        expect(navigatorSpy.goToPlayerTrophySuitePage).toHaveBeenCalledWith(gameId, playerId)
    });
});
