import type {MockedObject} from 'vitest';
import {beforeEach, describe, expect, it, vi} from 'vitest';
import {TestBed} from '@angular/core/testing';
import {of} from 'rxjs';

import {HomeStatsStore} from './home-stats-store.service';
import {PlayerApiService} from '../../core/api/services/player-api.service';
import {TrophyApiService} from '../../core/api/services/trophy-api.service';
import {GameApiService} from '../../core/api/services/game-api.service';
import {LoadingStatus} from '../../core/models/loading-status.enum';
import {HomeStatsData} from '../models/home-stats-data';

describe('HomeStatsStore', () => {
  let store: HomeStatsStore;

  let mockPlayerApiService: MockedObject<PlayerApiService>;
  let mockGameApiService: MockedObject<GameApiService>;
  let mockTrophyApiService: MockedObject<TrophyApiService>;

  beforeEach(() => {
    mockPlayerApiService = {
      count: vi.fn(),
      countRecent: vi.fn(),
    } as MockedObject<PlayerApiService>;

    mockGameApiService = {
      count: vi.fn(),
      countRecent: vi.fn(),
    } as MockedObject<GameApiService>;

    mockTrophyApiService = {
      count: vi.fn(),
      countRecentlyEarned: vi.fn(),
    } as MockedObject<TrophyApiService>;

    TestBed.configureTestingModule({
      providers: [
        {provide: PlayerApiService, useValue: mockPlayerApiService},
        {provide: GameApiService, useValue: mockGameApiService},
        {provide: TrophyApiService, useValue: mockTrophyApiService},
      ],
    });

    store = TestBed.inject(HomeStatsStore);
  });

  it('should be created', () => {
    expect(store).toBeTruthy();
  });

  it('should update stats when fetched from backend', () => {
    mockPlayerApiService.count.mockReturnValue(of(10));
    mockPlayerApiService.countRecent.mockReturnValue(of(5));
    mockGameApiService.count.mockReturnValue(of(100));
    mockGameApiService.countRecent.mockReturnValue(of(50));
    mockTrophyApiService.count.mockReturnValue(of(1000));
    mockTrophyApiService.countRecentlyEarned.mockReturnValue(of(500));

    store.fetch();

    expect(mockPlayerApiService.countRecent).toHaveBeenCalled();
    expect(mockPlayerApiService.count).toHaveBeenCalled();
    expect(mockGameApiService.count).toHaveBeenCalled();
    expect(mockGameApiService.countRecent).toHaveBeenCalled();
    expect(mockTrophyApiService.count).toHaveBeenCalled();
    expect(mockTrophyApiService.countRecentlyEarned).toHaveBeenCalled();

    expect(store.status()).toBe(LoadingStatus.FULLY_LOADED);
    expect(store.data()).toEqual({
      total: {
        player: 10,
        game: 100,
        trophy: 1000,
      },
      lastWeek: {
        player: 5,
        game: 50,
        trophy: 500,
      }
    } as HomeStatsData);
  });
});
