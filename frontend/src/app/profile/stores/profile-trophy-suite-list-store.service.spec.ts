import type {MockedObject} from "vitest";
import {beforeEach, describe, expect, it, vi} from 'vitest';
import {TestBed} from '@angular/core/testing';

import {PlayerApiService} from "../../core/api/services/player-api.service";
import {ProfileTrophySuiteListStoreService} from "./profile-trophy-suite-list-store.service";
import {of} from "rxjs";
import {PlayedTrophySuiteSearchElement} from "../../core/api/dtos/trophy-suite/played-trophy-suite-search-element";
import {Pagination} from '../../core/api/dtos/pagination';

describe('ProfileTrophySuiteListStoreService', () => {
  let store: ProfileTrophySuiteListStoreService;

  let mockedPlayerApiService: MockedObject<PlayerApiService>;

  beforeEach(() => {
    mockedPlayerApiService = {
      searchPlayedTrophySuites: vi.fn()
    } as MockedObject<PlayerApiService>;
    TestBed.configureTestingModule({
      providers: [{provide: PlayerApiService, useValue: mockedPlayerApiService}]
    });
    store = TestBed.inject(ProfileTrophySuiteListStoreService);
  });

  it('should be created', () => {
    expect(store).toBeTruthy();
  });

  it('should search for trophy suites played by player', () => {
    const mockPlayerId = 'player-123';
    const mockSearchResult = {
      content: [
        {id: 'trophy-suite-1', name: 'Trophy suite 1'} as PlayedTrophySuiteSearchElement,
        {id: 'trophy-suite-2', name: 'Trophy suite 2'} as PlayedTrophySuiteSearchElement,
      ],
      total: 10
    } as Pagination<PlayedTrophySuiteSearchElement>;
    mockedPlayerApiService.searchPlayedTrophySuites.mockReturnValue(of(mockSearchResult));

    store.search(mockPlayerId);

    expect(mockedPlayerApiService.searchPlayedTrophySuites).toHaveBeenCalledWith(mockPlayerId, 0, 20);
    expect(store.trophySuites()).toEqual(mockSearchResult.content);
  });
});
