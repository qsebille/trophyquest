import type {MockedObject} from "vitest";
import {TestBed} from '@angular/core/testing';

import {PlayerListStore} from './player-list-store';
import {PlayerApiService} from '../../core/api/services/player-api.service';
import {LoadingStatus} from "../../core/models/loading-status.enum";
import {of} from "rxjs";
import {PlayerSearchItem} from "../../core/api/dtos/player/player-search-item";
import {SearchResult} from "../../core/api/dtos/search-result";

describe('PlayerListStore', () => {
  let store: PlayerListStore;

  let mockedPlayerApiService: MockedObject<PlayerApiService>;

  beforeEach(() => {
    mockedPlayerApiService = {
      search: vi.fn().mockName("PlayerApiService.search"),
      count: vi.fn().mockName("PlayerApiService.count")
    } as MockedObject<PlayerApiService>;
    TestBed.configureTestingModule({
      providers: [
        {provide: PlayerApiService, useValue: mockedPlayerApiService},
      ]
    });
    store = TestBed.inject(PlayerListStore);
  });

  it('should be created', () => {
    expect(store).toBeTruthy();
    expect(store.results()).toEqual([]);
    expect(store.total()).toEqual(0);
    expect(store.status()).toEqual(LoadingStatus.NONE);
  });

  it('should search for players', () => {
    const mockSearchResult = {
      content: [{id: 'player-1', pseudo: 'John Doe'} as PlayerSearchItem],
      total: 10
    } as SearchResult<PlayerSearchItem>;
    mockedPlayerApiService.search.mockReturnValue(of(mockSearchResult));
    mockedPlayerApiService.count.mockReturnValue(of(10));

    store.search();

    expect(mockedPlayerApiService.search).toHaveBeenCalledWith(0, 20);
    expect(store.results()).toEqual(mockSearchResult.content);
    expect(store.total()).toEqual(10);
    expect(store.status()).toEqual(LoadingStatus.PARTIALLY_LOADED);
  });
});
