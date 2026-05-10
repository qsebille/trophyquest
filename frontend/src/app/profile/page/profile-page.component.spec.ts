import type {MockedObject} from "vitest";
import {beforeEach, describe, expect, it, vi} from 'vitest';
import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfilePageComponent} from './profile-page.component';
import {ActivatedRoute} from '@angular/router';
import {NavigatorService} from "../../core/services/navigator.service";
import {ProfileSummaryComponent} from "../components/profile-summary/profile-summary.component";
import {ProfileTrophyCardComponent} from "../components/profile-trophy-card/profile-trophy-card.component";
import {ProfileSummaryStore} from "../../stores/profile-summary-store.service";
import {ProfileTrophySuiteListStoreService} from "../../stores/profile-trophy-suite-list-store.service";
import {ProfileTrophiesStore} from "../../stores/profile-trophies-store.service";
import {Player} from "../../core/api/dtos/player/player";
import {PlayerStats} from "../../../core/api/dtos/player/player-stats";
import {PlayerApiService} from "../../core/api/services/player-api.service";
import {BackgroundImageService} from "../../core/stores/background-image.service";

describe('ProfilePageComponent', () => {
  let component: ProfilePageComponent;
  let fixture: ComponentFixture<ProfilePageComponent>;

  let mockedProfileSummaryStore: MockedObject<ProfileSummaryStore>;
  let mockedProfileTrophySuiteListStore: MockedObject<ProfileTrophySuiteListStoreService>;
  let mockedProfileTrophiesStore: MockedObject<ProfileTrophiesStore>;
  let mockedPlayerApiService: MockedObject<PlayerApiService>;
  let mockedNavigator: MockedObject<NavigatorService>;
  let mockedGameCoverStore: MockedObject<BackgroundImageService>;

  const mockPlayer = {id: 'player-123', pseudo: 'PlayerId', avatar: 'avatar.png'} as Player;
  const mockPlayerStats = {
    nbGamesPlayed: 100,
    nbEarnedPlatinum: 1,
    nbEarnedGold: 2,
    nbEarnedSilver: 3,
    nbEarnedBronze: 4,
  } as PlayerStats;

  beforeEach(async () => {
    mockedNavigator = {
      goToTrophySuitePage: vi.fn()
    } as MockedObject<NavigatorService>;
    mockedProfileSummaryStore = {
      retrieve: vi.fn(),
      reset: vi.fn(),
      player: vi.fn(),
      playerStats: vi.fn(),
      status: vi.fn()
    } as MockedObject<ProfileSummaryStore>;
    mockedProfileTrophySuiteListStore = {
      search: vi.fn(),
      reset: vi.fn(),
      loadMore: vi.fn(),
      trophySuites: vi.fn(),
      status: vi.fn()
    } as MockedObject<ProfileTrophySuiteListStoreService>;
    mockedProfileTrophiesStore = {
      search: vi.fn(),
      reset: vi.fn(),
      loadMore: vi.fn(),
      trophies: vi.fn(),
      status: vi.fn()
    } as MockedObject<ProfileTrophiesStore>;
    mockedPlayerApiService = {
      deletePlayer: vi.fn()
    } as MockedObject<PlayerApiService>;
    mockedGameCoverStore = {
      usePlayerLastGameBackground: vi.fn()
    } as MockedObject<BackgroundImageService>;

    mockedProfileSummaryStore.player.mockReturnValue(mockPlayer);
    mockedProfileSummaryStore.playerStats.mockReturnValue(mockPlayerStats);

    const routeParamMap = new Map<string, string>();
    routeParamMap.set('playerId', mockPlayer.id);

    await TestBed.configureTestingModule({
      imports: [ProfilePageComponent, ProfileSummaryComponent, ProfileTrophyCardComponent],
      providers: [
        {provide: NavigatorService, useValue: mockedNavigator},
        {provide: ProfileSummaryStore, useValue: mockedProfileSummaryStore},
        {provide: ProfileTrophySuiteListStoreService, useValue: mockedProfileTrophySuiteListStore},
        {provide: ProfileTrophiesStore, useValue: mockedProfileTrophiesStore},
        {provide: PlayerApiService, useValue: mockedPlayerApiService},
        {provide: BackgroundImageService, useValue: mockedGameCoverStore},
        {provide: ActivatedRoute, useValue: {snapshot: {paramMap: routeParamMap}}},
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should fetch profile infos on init', () => {
    expect(mockedProfileSummaryStore.retrieve).toHaveBeenCalledWith(mockPlayer.id);
    expect(mockedProfileTrophySuiteListStore.search).toHaveBeenCalledWith(mockPlayer.id);
    expect(mockedProfileTrophiesStore.search).toHaveBeenCalledWith(mockPlayer.id);
  });

  it('should refresh game cover when player changes', () => {
    expect(mockedGameCoverStore.usePlayerLastGameBackground).toHaveBeenCalledWith(mockPlayer.id);
  });

  it('should navigate to game page when clicking on game card', () => {
    const trophySuiteId: string = 'suite-123';
    component.navigateToPlayerTrophySuitePage(trophySuiteId);

    expect(mockedNavigator.goToTrophySuitePage).toHaveBeenCalledTimes(1);
    expect(mockedNavigator.goToTrophySuitePage).toHaveBeenCalledWith(trophySuiteId, mockPlayer.id);
  });
});
