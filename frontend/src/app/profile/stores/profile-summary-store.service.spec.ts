import type {MockedObject} from "vitest";
import {beforeEach, describe, expect, it, vi} from 'vitest';
import {TestBed} from '@angular/core/testing';

import {ProfileSummaryStore} from './profile-summary-store.service';
import {PlayerApiService} from "../../core/api/services/player-api.service";
import {emptyPlayer, Player} from "../../core/api/dtos/player/player";
import {of} from "rxjs";
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
    expect(store.player()).toEqual(emptyPlayer);
  });

  it('should load player summary when retrieve is called', () => {
    const mockPlayerId = 'player-123';
    const mockPlayer: Player = {id: mockPlayerId, pseudo: 'John Doe', avatar: 'avatar.png'};
    const mockPlayerStats: PlayerStats = {
      nbGamesPlayed: 1,
      nbEarnedPlatinum: 2,
      nbEarnedGold: 3,
      nbEarnedSilver: 4,
      nbEarnedBronze: 5
    };

    mockedPlayerApiService.fetch.mockReturnValue(of(mockPlayer));
    mockedPlayerApiService.fetchStats.mockReturnValue(of(mockPlayerStats));

    store.retrieve(mockPlayerId);

    expect(store.player()).toEqual(mockPlayer);
    expect(store.playerStats()).toEqual(mockPlayerStats);
  });
});
