import {beforeEach, describe, expect, it, vi} from 'vitest';
import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfilePageComponent} from './profile-page.component';
import {ActivatedRoute} from '@angular/router';
import {NavigatorService} from "../../core/services/navigator.service";
import {ProfileSummaryComponent} from "../components/profile-summary/profile-summary.component";
import {ProfileTrophyCardComponent} from "../components/profile-trophy-card/profile-trophy-card.component";
import {BackgroundImageService} from "../../core/stores/background-image.service";
import {ProfileDeleteService} from '../services/profile-delete.service';
import {ProfileSummaryDataService} from '../services/profile-summary-data.service';
import {ProfileTrophySuiteDataService} from '../services/profile-trophy-suite-data.service';
import {ProfileTrophyDataService} from '../services/profile-trophy-data.service';
import {PlayerSearchItem} from '../../core/api/dtos/player/player-search-item';
import {signal} from "@angular/core";

describe('ProfilePageComponent', () => {
  let component: ProfilePageComponent;
  let fixture: ComponentFixture<ProfilePageComponent>;

  const backgroundImageServiceMock = {
    usePlayerLastGameBackground: vi.fn()
  };
  const profileDeleteServiceMock = {
    deleteProfile: vi.fn(),
  };
  const profileSummaryDataServiceMock = {
    retrieve: vi.fn(),
    reset: vi.fn(),
    data: signal({} as PlayerSearchItem),
    isLoading: signal(false),
    isError: signal(false),
  };
  const profileTrophySuiteDataServiceMock = {
    init: vi.fn(),
    reset: vi.fn(),
    loadMore: vi.fn(),
    trophySuites: signal([]),
    total: signal(0),
    isLoading: signal(false),
    isError: signal(false),
  };
  const profileTrophyDataServiceMock = {
    init: vi.fn(),
    reset: vi.fn(),
    loadMore: vi.fn(),
    trophies: signal([]),
    total: signal(0),
    isLoading: signal(false),
    isError: signal(false),
  };
  const navigatorMock = {
    goToErrorPage: vi.fn(),
    goToTrophySuitePage: vi.fn()
  };

  const playerMock = {
    id: 'player-123',
    pseudo: 'Player 123',
    avatar: 'avatar.png',
  } as PlayerSearchItem;

  beforeEach(async () => {
    profileSummaryDataServiceMock.data.set(playerMock);

    const routeParamMap = new Map<string, string>();
    routeParamMap.set('playerId', playerMock.id);

    await TestBed.configureTestingModule({
      imports: [ProfilePageComponent, ProfileSummaryComponent, ProfileTrophyCardComponent],
      providers: [
        {provide: ActivatedRoute, useValue: {snapshot: {paramMap: routeParamMap}}},
      ]
    }).compileComponents();
    TestBed.overrideComponent(ProfilePageComponent, {
      set: {
        providers: [
          {provide: BackgroundImageService, useValue: backgroundImageServiceMock},
          {provide: ProfileSummaryDataService, useValue: profileSummaryDataServiceMock},
          {provide: ProfileTrophySuiteDataService, useValue: profileTrophySuiteDataServiceMock},
          {provide: ProfileTrophyDataService, useValue: profileTrophyDataServiceMock},
          {provide: ProfileDeleteService, useValue: profileDeleteServiceMock},
          {provide: NavigatorService, useValue: navigatorMock},
        ]
      }
    });

    fixture = TestBed.createComponent(ProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  describe('Component setup', () => {
    it('should fetch profile infos on init', () => {
      component.ngOnInit();
      expect(profileSummaryDataServiceMock.retrieve).toHaveBeenCalledWith(playerMock.id);
      expect(profileTrophySuiteDataServiceMock.init).toHaveBeenCalledWith(playerMock.id);
      expect(profileTrophyDataServiceMock.init).toHaveBeenCalledWith(playerMock.id);
    });

    it('should refresh game cover when player changes', () => {
      component.ngOnInit();
      expect(backgroundImageServiceMock.usePlayerLastGameBackground).toHaveBeenCalledWith(playerMock.id);
    });
  });

  it('should navigate to game page when clicking on game card', () => {
    const event = {gameId: 'game-123', trophySuiteId: 'suite-123'};
    component.navigateToPlayerTrophySuitePage(event);

    expect(navigatorMock.goToTrophySuitePage).toHaveBeenCalledTimes(1);
    expect(navigatorMock.goToTrophySuitePage).toHaveBeenCalledWith(event.trophySuiteId, event.gameId, playerMock.id);
  });

  it('should call loadMoreTrophySuites', () => {
    component.loadMoreTrophySuites();
    expect(profileTrophySuiteDataServiceMock.loadMore).toHaveBeenCalled();
  });

  it('should call loadMoreTrophies', () => {
    component.loadMoreTrophies();
    expect(profileTrophyDataServiceMock.loadMore).toHaveBeenCalled();
  });

  it('should call deletePlayer', () => {
    component.deletePlayer();
    expect(profileDeleteServiceMock.deleteProfile).toHaveBeenCalledWith(playerMock.id);
  });

  it('should reset data on destroy', () => {
    component.ngOnDestroy();
    expect(profileSummaryDataServiceMock.reset).toHaveBeenCalled();
    expect(profileTrophySuiteDataServiceMock.reset).toHaveBeenCalled();
    expect(profileTrophyDataServiceMock.reset).toHaveBeenCalled();
  });
});
