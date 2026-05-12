import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HomePageComponent} from './home-page.component';
import {NavigatorService} from "../../core/services/navigator.service";
import {signal} from '@angular/core';
import {ActivePlayerTrophy} from '../../core/api/dtos/player/active-player-trophy';
import {HomeDataService} from '../services/home-data.service';
import {BackgroundImageService} from '../../core/stores/background-image.service';
import {RecentGame} from '../../core/api/dtos/game/recent-game';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  const backgroundImageServiceMock = {
    useTopPlayedGame: vi.fn(),
  }
  const homeDataServiceMock = {
    fetchData: vi.fn(),
    reset: vi.fn(),
    isLoading: signal<boolean>(false),
    isError: signal<boolean>(false),
    recentGames: signal<RecentGame[]>([]),
    topActivePlayerTrophies: signal<ActivePlayerTrophy[]>([]),
  }
  const navigatorMock = {
    goToGamePage: vi.fn(),
    goToProfilePage: vi.fn(),
    goToTrophySuitePage: vi.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({}).compileComponents();
    TestBed.overrideComponent(HomePageComponent, {
      set: {
        providers: [
          {provide: HomeDataService, useValue: homeDataServiceMock},
          {provide: NavigatorService, useValue: navigatorMock},
          {provide: BackgroundImageService, useValue: backgroundImageServiceMock},
        ],
      }
    });

    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => vi.clearAllMocks());

  it('should create', () => expect(component).toBeTruthy());

  describe('Component setup', () => {
    it('should fetch data on init', () => {
      expect(backgroundImageServiceMock.useTopPlayedGame).toHaveBeenCalled();
      expect(homeDataServiceMock.fetchData).toHaveBeenCalled();
    });
  });

  describe('Navigation', () => {
    it('should navigate to game page', () => {
      component.navigateToGamePage('game-123');
      expect(navigatorMock.goToGamePage).toHaveBeenCalledWith('game-123');
    });

    it('should navigate to profile page', () => {
      component.navigateToProfilePage('player-123');
      expect(navigatorMock.goToProfilePage).toHaveBeenCalledWith('player-123');
    });

    it('should navigate to trophy suite page', () => {
      const data = {
        playerId: 'player-123',
        gameId: 'game-123',
        trophySuiteId: 'suite-123',
      }
      component.navigateToTrophySuitePage(data);
      expect(navigatorMock.goToTrophySuitePage).toHaveBeenCalledWith('suite-123', 'game-123', 'player-123');
    });
  });
});
