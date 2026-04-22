import type {MockedObject} from "vitest";
import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HomePageComponent} from './home-page.component';
import {NavigatorService} from "../../../core/services/navigator.service";
import {HomeStatsStore} from "../../stores/home-stats-store.service";
import {HomeRecentPlayersStore} from "../../stores/home-recent-players-store.service";
import {HomeRecentGamesStore} from "../../stores/home-recent-games-store.service";
import {GameCoverStoreService} from "../../../core/stores/game-cover-store.service";

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  let mockStatsStore: MockedObject<HomeStatsStore>;
  let mockRecentPlayersStore: MockedObject<HomeRecentPlayersStore>;
  let mockRecentGameStore: MockedObject<HomeRecentGamesStore>;
  let mockNavigator: MockedObject<NavigatorService>;
  let mockGameCoverStore: MockedObject<GameCoverStoreService>;

  beforeEach(async () => {
    mockGameCoverStore = {
      refreshTopPlayedGame: vi.fn()
    } as MockedObject<GameCoverStoreService>;
    mockStatsStore = {
      data: vi.fn(),
      fetch: vi.fn(),
      status: vi.fn(),
    } as MockedObject<HomeStatsStore>;
    mockRecentPlayersStore = {
      fetch: vi.fn(),
      players: vi.fn(),
      status: vi.fn(),
    } as MockedObject<HomeRecentPlayersStore>;
    mockRecentGameStore = {
      fetch: vi.fn(),
      games: vi.fn(),
      total: vi.fn(),
      status: vi.fn(),
    } as MockedObject<HomeRecentGamesStore>;
    mockNavigator = {
      goToPlayersPage: vi.fn(),
      goToProfilePage: vi.fn(),
      goToTrophySuitePage: vi.fn(),
    } as MockedObject<NavigatorService>;

    mockRecentPlayersStore.players.mockReturnValue([]);

    await TestBed.configureTestingModule({}).compileComponents();

    TestBed.overrideComponent(HomePageComponent, {
      set: {
        providers: [
          {provide: HomeStatsStore, useValue: mockStatsStore},
          {provide: HomeRecentPlayersStore, useValue: mockRecentPlayersStore},
          {provide: HomeRecentGamesStore, useValue: mockRecentGameStore},
          {provide: NavigatorService, useValue: mockNavigator},
          {provide: GameCoverStoreService, useValue: mockGameCoverStore},
        ],
      }
    });

    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should refresh game cover on init', () => {
    expect(mockGameCoverStore.refreshTopPlayedGame).toHaveBeenCalledTimes(1);
    component.ngOnInit();
    expect(mockGameCoverStore.refreshTopPlayedGame).toHaveBeenCalledTimes(2);
  });

  it('should fetch store data on init', () => {
    expect(mockStatsStore.fetch).toHaveBeenCalledTimes(1);
    expect(mockRecentPlayersStore.fetch).toHaveBeenCalledTimes(1);
    component.ngOnInit();
    expect(mockStatsStore.fetch).toHaveBeenCalledTimes(2);
    expect(mockRecentPlayersStore.fetch).toHaveBeenCalledTimes(2);
  });
});
