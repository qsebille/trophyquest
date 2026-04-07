import type {MockedObject} from "vitest";
import {beforeEach, describe, expect, it, vi} from 'vitest';
import {TestBed} from '@angular/core/testing';

import {ProfileSummaryStore} from './profile-summary-store.service';
import {PlayerApiService} from "../../core/api/services/player-api.service";
import {EMPTY_PLAYER, Player} from "../../core/api/dtos/player/player";
import {of} from "rxjs";
import {LoadingStatus} from "../../core/models/loading-status.enum";
import {PlayerStats} from "../../core/api/dtos/player/player-stats";

describe('ProfileSummaryStore', () => {
  let store: ProfileSummaryStore;

  let mockedPlayerApiService: MockedObject<PlayerApiService>;

  beforeEach(() => {
    mockedPlayerApiService = {
      fetch: vi.fn(),
      fetchStats: vi.fn()
    } as MockedObject<PlayerApiService>;
    TestBed.configureTestingModule({
      providers: [{provide: PlayerApiService, useValue: mockedPlayerApiService}]
    });
    store = TestBed.inject(ProfileSummaryStore);
  });

  it('should be created', () => {
    expect(store).toBeTruthy();
    expect(store.player()).toEqual(EMPTY_PLAYER);
    expect(store.status()).toEqual(LoadingStatus.NONE);
  });

  it('should load player summary when retrieve is called', () => {
    const mockPlayerId = 'player-123';
    const mockPlayer: Player = {id: mockPlayerId, pseudo: 'John Doe', avatar: 'avatar.png'};
    const mockPlayerStats: PlayerStats = {
      totalTrophySuitesPlayed: 1,
      totalPlatinumTrophies: 2,
      totalGoldTrophies: 3,
      totalSilverTrophies: 4,
      totalBronzeTrophies: 5
    };

    mockedPlayerApiService.fetch.mockReturnValue(of(mockPlayer));
    mockedPlayerApiService.fetchStats.mockReturnValue(of(mockPlayerStats));

    store.retrieve(mockPlayerId);

    expect(store.player()).toEqual(mockPlayer);
    expect(store.playerStats()).toEqual(mockPlayerStats);
    expect(store.status()).toEqual(LoadingStatus.FULLY_LOADED);
  });
});
