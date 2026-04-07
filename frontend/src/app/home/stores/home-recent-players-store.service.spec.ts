import {TestBed} from '@angular/core/testing';

import {HomeRecentPlayersStore} from './home-recent-players-store.service';
import {PlayerApiService} from "../../core/api/services/player-api.service";
import {TopRecentPlayerRow} from "../../core/api/dtos/player/top-recent-player-row";
import {Player} from "../../core/api/dtos/player/player";
import {EarnedTrophy} from "../../core/api/dtos/trophy/earned-trophy";
import {of} from "rxjs";
import {LoadingStatus} from "../../core/models/loading-status.enum";
import {MockedObject} from 'vitest';


describe('HomeRecentPlayersStore', () => {
  let store: HomeRecentPlayersStore;

  let mockPlayerApiService: MockedObject<PlayerApiService>;

  beforeEach(() => {
    mockPlayerApiService = {
      fetchTopRecent: vi.fn()
    } as MockedObject<PlayerApiService>;

    TestBed.configureTestingModule({
      providers: [{provide: PlayerApiService, useValue: mockPlayerApiService}]
    });
    store = TestBed.inject(HomeRecentPlayersStore);
  });

  it('should be created', () => {
    expect(store).toBeTruthy();
    expect(store.players()).toEqual([]);
    expect(store.status()).toEqual(LoadingStatus.NONE);
  });

  it('should set top players when fetched from backend', () => {
    const mockResult = [
      {
        player: {id: 'player-1', pseudo: 'John Doe'} as Player,
        lastTrophies: [
          {id: 'trophy-1', title: 'Trophy 1'} as EarnedTrophy
        ],
        recentTrophyCount: 100,
      } as TopRecentPlayerRow,
    ];
    mockPlayerApiService.fetchTopRecent.mockReturnValue(of(mockResult));

    store.fetch();

    expect(mockPlayerApiService.fetchTopRecent).toHaveBeenCalledTimes(1);
    expect(store.players()).toEqual(mockResult);
    expect(store.status()).toEqual(LoadingStatus.FULLY_LOADED);
  });
});
