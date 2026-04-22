import type {MockedObject} from "vitest";
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PlayersPageComponent} from './players-page.component';
import {PlayerListStore} from '../../stores/player-list-store';
import {NavigatorService} from "../../../core/services/navigator.service";
import {PlayerCardComponent} from "../player-card/player-card.component";
import {AddPlayerFormComponent} from "../add-player-form/add-player-form.component";
import {GameCoverStoreService} from "../../../core/stores/game-cover-store.service";

describe('PlayersPageComponent', () => {
  let component: PlayersPageComponent;
  let fixture: ComponentFixture<PlayersPageComponent>;

  let mockNavigator: MockedObject<NavigatorService>;
  let mockPlayerListStore: MockedObject<PlayerListStore>;
  let mockGameCoverStore: MockedObject<GameCoverStoreService>;

  beforeEach(async () => {
    mockNavigator = {
      goToProfilePage: vi.fn(),
    } as MockedObject<NavigatorService>;
    mockPlayerListStore = {
      resetSearch: vi.fn(),
      search: vi.fn(),
      loadMore: vi.fn(),
      addPlayer: vi.fn(),
      resetAddPlayerStatus: vi.fn(),
      players: vi.fn(),
      total: vi.fn(),
      status: vi.fn(),
      addStatus: vi.fn(),
    } as MockedObject<PlayerListStore>;
    mockGameCoverStore = {
      refreshTopPlayedGame: vi.fn()
    } as MockedObject<GameCoverStoreService>;

    mockPlayerListStore.players.mockReturnValue([]);

    await TestBed.configureTestingModule({
      imports: [PlayersPageComponent, PlayerCardComponent, AddPlayerFormComponent],
      providers: [
        {provide: NavigatorService, useValue: mockNavigator},
        {provide: PlayerListStore, useValue: mockPlayerListStore},
        {provide: GameCoverStoreService, useValue: mockGameCoverStore},
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PlayersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should refresh game cover when players page loads', () => {
    component.ngOnInit();
    expect(mockGameCoverStore.refreshTopPlayedGame).toHaveBeenCalled();
  });

  it('should reset search on init', () => {
    expect(mockPlayerListStore.resetSearch).toHaveBeenCalled();
    expect(mockPlayerListStore.search).toHaveBeenCalled();
  });
});
