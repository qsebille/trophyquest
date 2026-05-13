import {ComponentFixture, TestBed} from '@angular/core/testing';
import {signal} from '@angular/core';
import {ActivatedRoute, convertToParamMap, ParamMap, Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';

import {GamePageComponent} from './game-page.component';
import {BackgroundImageService} from '../../core/stores/background-image.service';
import {GameDetails} from '../../core/api/dtos/game/game-details';
import {GameDataService} from '../services/game-data.service';
import {Pagination} from '../../core/api/dtos/pagination';
import {GamePlayer} from '../../core/api/dtos/player/game-player';
import {NavigatorService} from '../../core/services/navigator.service';

describe('GamePageComponent', () => {
  let component: GamePageComponent;
  let fixture: ComponentFixture<GamePageComponent>;

  const queryParamMapSubject = new BehaviorSubject<ParamMap>(
    convertToParamMap({})
  );
  const activatedRouteMock: Partial<ActivatedRoute> = {
    snapshot: {
      paramMap: convertToParamMap({gameId: 'game-123'}),
      queryParamMap: queryParamMapSubject.value,
    },
    queryParamMap: queryParamMapSubject.asObservable(),
  } as unknown as ActivatedRoute;

  const gameDetailsMock = {
    id: 'game-123',
    name: 'Game 123',
    coverUrl: 'game-123.png',
    screenshotsUrl: ['screenshot-1.png', 'screenshot-2.png'],
  } as unknown as GameDetails;

  const backgroundImageServiceMock = {
    useGameBackground: vi.fn(),
  };

  const dataServiceMock = {
    reset: vi.fn(),
    fetchDetails: vi.fn(),
    fetchPlayers: vi.fn(),
    fetchTrophies: vi.fn(),
    isError: signal(false),
    gameDetails: signal(gameDetailsMock),
    trophySuites: signal([]),
    trophies: signal([]),
    playersPagination: signal({
      content: [],
      page: 0,
      total: 0,
      size: 10,
    } as unknown as Pagination<GamePlayer>),
  };

  const navigatorMock = {
    goToProfilePage: vi.fn(),
  };

  const routerMock = {
    navigate: vi.fn().mockResolvedValue(true),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GamePageComponent],
      providers: [
        {provide: BackgroundImageService, useValue: backgroundImageServiceMock},
        {provide: NavigatorService, useValue: navigatorMock},
        {provide: Router, useValue: routerMock},
        {provide: ActivatedRoute, useValue: activatedRouteMock},
      ],
    })
      .overrideComponent(GamePageComponent, {
        set: {
          providers: [
            {provide: GameDataService, useValue: dataServiceMock},
          ],
        },
      })
      .compileComponents();
  });

  afterEach(() => {
    vi.clearAllMocks();
  })

  function createComponent(queryParams: Record<string, string> = {}): void {
    queryParamMapSubject.next(convertToParamMap(queryParams));

    fixture = TestBed.createComponent(GamePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  it('should create', () => {
    createComponent();

    expect(component).toBeTruthy();
  });

  describe('Component setup', () => {
    it('should read selected values from query params', () => {
      createComponent({
        tab: 'trophies',
        trophySuiteId: 'suite-123',
        playerId: 'player-123',
      });

      expect(component.selectedTab()).toBe('trophies');
      expect(component.selectedTrophySuiteId()).toBe('suite-123');
      expect(component.selectedPlayerId()).toBe('player-123');
    });

    it('should fetch initial data', () => {
      createComponent();

      expect(backgroundImageServiceMock.useGameBackground).toHaveBeenCalledWith('game-123');
      expect(dataServiceMock.fetchDetails).toHaveBeenCalledWith('game-123');
      expect(dataServiceMock.fetchPlayers).toHaveBeenCalledWith('game-123', 0);
    });

    it('should fetch trophies on init when trophySuiteId is present', () => {
      createComponent({
        trophySuiteId: 'suite-123',
        playerId: 'player-123',
      });

      expect(dataServiceMock.fetchTrophies).toHaveBeenCalledWith(
        'suite-123',
        'player-123'
      );
    });
  });

  describe('Navigation', () => {
    beforeEach(() => {
      createComponent();
    });

    it('should update url when tab changes', () => {
      component.onTabChange('players');

      expect(routerMock.navigate).toHaveBeenCalledWith([], {
        relativeTo: activatedRouteMock,
        queryParams: {
          tab: 'players',
        },
        queryParamsHandling: 'merge',
        replaceUrl: true,
      });
    });

    it('should update url and fetch trophies when trophy suite changes', () => {
      component.onTrophySuiteSelectedChange('suite-123');

      expect(routerMock.navigate).toHaveBeenCalledWith([], {
        relativeTo: activatedRouteMock,
        queryParams: {
          trophySuiteId: 'suite-123',
        },
        queryParamsHandling: 'merge',
        replaceUrl: true,
      });

      expect(dataServiceMock.fetchTrophies).toHaveBeenCalledWith(
        'suite-123',
        null
      );
    });

    it('should update url and fetch trophies when player is selected', () => {
      queryParamMapSubject.next(convertToParamMap({
        trophySuiteId: 'suite-123',
      }));

      fixture.detectChanges();

      component.onPlayerSelected('player-123');

      expect(routerMock.navigate).toHaveBeenCalledWith([], {
        relativeTo: activatedRouteMock,
        queryParams: {
          tab: 'trophies',
          playerId: 'player-123',
        },
        queryParamsHandling: 'merge',
        replaceUrl: true,
      });

      expect(dataServiceMock.fetchTrophies).toHaveBeenCalledWith(
        'suite-123',
        'player-123'
      );
    });

    it('should navigate to profile page', () => {
      component.goToProfilePage('player-123');

      expect(navigatorMock.goToProfilePage).toHaveBeenCalledWith('player-123');
    });
  });

  describe('Pagination', () => {
    it('should fetch players when page changes', () => {
      createComponent();

      component.onPlayerPageChange(2);

      expect(dataServiceMock.fetchPlayers).toHaveBeenCalledWith('game-123', 2);
    });
  });

  describe('Destroy', () => {
    it('should reset data service', () => {
      createComponent();

      fixture.destroy();

      expect(dataServiceMock.reset).toHaveBeenCalled();
    });
  });
});
