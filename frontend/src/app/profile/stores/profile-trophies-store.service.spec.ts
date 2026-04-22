import type {MockedObject} from "vitest";
import {beforeEach, describe, expect, it, vi} from 'vitest';
import {TestBed} from '@angular/core/testing';

import {ProfileTrophiesStore} from './profile-trophies-store.service';
import {PlayerApiService} from "../../core/api/services/player-api.service";
import {LoadingStatus} from "../../core/models/loading-status.enum";
import {EarnedTrophySearchItem} from "../../core/api/dtos/trophy/earned-trophy-search-item";
import {of} from "rxjs";
import {Pagination} from '../../core/api/dtos/pagination';

describe('ProfileTrophiesStore', () => {
  let store: ProfileTrophiesStore;

  let mockedPlayerApiService: MockedObject<PlayerApiService>;

  beforeEach(() => {
    mockedPlayerApiService = {
      searchEarnedTrophies: vi.fn()
    } as MockedObject<PlayerApiService>;
    TestBed.configureTestingModule({
      providers: [{provide: PlayerApiService, useValue: mockedPlayerApiService}]
    });
    store = TestBed.inject(ProfileTrophiesStore);
  });

  it('should be created', () => {
    expect(store).toBeTruthy();
    expect(store.status()).toEqual(LoadingStatus.NONE);
  });

  it('should search for player trophies', () => {
    const mockPlayerId = 'player-123';
    const mockSearchResult: Pagination<EarnedTrophySearchItem> = {
      content: [
        {id: 'trophy-1', title: 'Trophy 1'} as EarnedTrophySearchItem,
        {id: 'trophy-2', title: 'Trophy 2'} as EarnedTrophySearchItem,
      ],
      total: 10
    } as Pagination<EarnedTrophySearchItem>;
    mockedPlayerApiService.searchEarnedTrophies.mockReturnValue(of(mockSearchResult));

    store.search(mockPlayerId);

    expect(mockedPlayerApiService.searchEarnedTrophies).toHaveBeenCalledWith(mockPlayerId, 0, 20);
    expect(store.status()).toEqual(LoadingStatus.PARTIALLY_LOADED);
    expect(store.trophies()).toEqual(mockSearchResult.content);
  });
});
