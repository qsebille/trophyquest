import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfilePageComponent} from './profile-page.component';
import {ActivatedRoute} from '@angular/router';
import {NavigatorService} from "../../../core/services/navigator.service";
import {ProfileSummaryComponent} from "../profile-summary/profile-summary.component";
import {ProfileTrophyCardComponent} from "../profile-trophy-card/profile-trophy-card.component";
import {ProfileSummaryStore} from "../../stores/profile-summary-store.service";
import {ProfileTrophySuiteListStoreService} from "../../stores/profile-trophy-suite-list-store.service";
import {ProfileTrophiesStore} from "../../stores/profile-trophies-store.service";
import {Player} from "../../../core/api/dtos/player/player";
import {PlayerStats} from "../../../core/api/dtos/player/player-stats";
import {PlayerApiService} from "../../../core/api/services/player-api.service";

describe('ProfilePageComponent', () => {
    let component: ProfilePageComponent;
    let fixture: ComponentFixture<ProfilePageComponent>;
    let profileSummaryStoreSpy: jasmine.SpyObj<ProfileSummaryStore>;
    let profileTrophySuiteListStoreSpy: jasmine.SpyObj<ProfileTrophySuiteListStoreService>;
    let profileTrophiesStoreSpy: jasmine.SpyObj<ProfileTrophiesStore>;
    let playerApiServiceSpy: jasmine.SpyObj<PlayerApiService>;
    let navigatorSpy: jasmine.SpyObj<NavigatorService>;

    const mockPlayer = {id: 'player-123', pseudo: 'PlayerId', avatar: 'avatar.png'} as Player;
    const mockPlayerStats = {
        totalTrophySuitesPlayed: 100,
        totalPlatinumTrophies: 1,
        totalGoldTrophies: 2,
        totalSilverTrophies: 3,
        totalBronzeTrophies: 4,
    } as PlayerStats;

    beforeEach(async () => {
        navigatorSpy = jasmine.createSpyObj('NavigatorService', ['goToPlayerTrophySuitePage']);
        profileSummaryStoreSpy = jasmine.createSpyObj('ProfileSummaryStore', ['retrieve', 'reset', 'player', 'playerStats', 'status']);
        profileTrophySuiteListStoreSpy = jasmine.createSpyObj('ProfileTrophySuiteListStoreService', ['search', 'reset', 'loadMore', 'trophySuites', 'status']);
        profileTrophiesStoreSpy = jasmine.createSpyObj('ProfileTrophiesStore', ['search', 'reset', 'loadMore', 'trophies', 'status']);
        playerApiServiceSpy = jasmine.createSpyObj('PlayerApiService', ['deletePlayer']);

        profileSummaryStoreSpy.player.and.returnValue(mockPlayer);
        profileSummaryStoreSpy.playerStats.and.returnValue(mockPlayerStats);

        const routeParamMap = new Map<string, string>();
        routeParamMap.set('playerId', mockPlayer.id);

        await TestBed.configureTestingModule({
            imports: [ProfilePageComponent, ProfileSummaryComponent, ProfileTrophyCardComponent],
            providers: [
                {provide: NavigatorService, useValue: navigatorSpy},
                {provide: ProfileSummaryStore, useValue: profileSummaryStoreSpy},
                {provide: ProfileTrophySuiteListStoreService, useValue: profileTrophySuiteListStoreSpy},
                {provide: ProfileTrophiesStore, useValue: profileTrophiesStoreSpy},
                {provide: PlayerApiService, useValue: playerApiServiceSpy},
                {provide: ActivatedRoute, useValue: {snapshot: {paramMap: routeParamMap}}},
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ProfilePageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => expect(component).toBeTruthy());

    it('should fetch profile infos on init', () => {
        expect(profileSummaryStoreSpy.reset).toHaveBeenCalled();
        expect(profileSummaryStoreSpy.retrieve).toHaveBeenCalledWith(mockPlayer.id);
        expect(profileTrophySuiteListStoreSpy.reset).toHaveBeenCalled();
        expect(profileTrophySuiteListStoreSpy.search).toHaveBeenCalledWith(mockPlayer.id);
        expect(profileTrophiesStoreSpy.reset).toHaveBeenCalled();
        expect(profileTrophiesStoreSpy.search).toHaveBeenCalledWith(mockPlayer.id);
    });

    it('should navigate to game page when clicking on game card', () => {
        const trophySuiteId: string = 'suite-123';
        component.navigateToPlayerTrophySuitePage(trophySuiteId);

        expect(navigatorSpy.goToPlayerTrophySuitePage).toHaveBeenCalledOnceWith(trophySuiteId, mockPlayer.id);
    });

});
