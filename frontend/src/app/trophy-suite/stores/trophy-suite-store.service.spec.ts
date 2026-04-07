import {TestBed} from '@angular/core/testing';
import {of} from 'rxjs';
import {beforeEach, describe, expect, it, MockedObject, vi} from 'vitest';

import {TrophySuiteStoreService} from './trophy-suite-store.service';
import {TrophySuiteApiService} from '../../core/api/services/trophy-suite-api.service';
import {TrophySuite} from '../../core/api/dtos/trophy-suite/trophy-suite';
import {EarnedTrophy} from '../../core/api/dtos/trophy/earned-trophy';
import {LoadingStatus} from '../../core/models/loading-status.enum';
import {TrophySuiteGameDetails} from '../../core/api/dtos/game/trophy-suite-game-details';

describe('TrophySuiteStoreService', () => {
  let service: TrophySuiteStoreService;
  let mockedTrophySuiteApiService: MockedObject<TrophySuiteApiService>;

  beforeEach(() => {
    mockedTrophySuiteApiService = {
      fetch: vi.fn(),
      fetchTrophies: vi.fn(),
      fetchGame: vi.fn(),
    } as MockedObject<TrophySuiteApiService>;

    TestBed.configureTestingModule({
      providers: [
        TrophySuiteStoreService,
        {provide: TrophySuiteApiService, useValue: mockedTrophySuiteApiService},
      ],
    });

    service = TestBed.inject(TrophySuiteStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve information about trophy suite', () => {
    const trophySuiteId = 'trophy-suite-123';
    const playerId = 'player-123';

    const trophySuite = {
      id: trophySuiteId,
      title: 'Mock Trophy Suite',
    } as TrophySuite;

    const earnedTrophies = [
      {id: 'trophy-1', title: 'Trophy 1'},
      {id: 'trophy-2', title: 'Trophy 2'},
    ] as EarnedTrophy[];

    const game = {
      id: 'game-123',
      name: 'Mock Game',
    } as TrophySuiteGameDetails;

    mockedTrophySuiteApiService.fetch.mockReturnValue(of(trophySuite));
    mockedTrophySuiteApiService.fetchTrophies.mockReturnValue(of(earnedTrophies));
    mockedTrophySuiteApiService.fetchGame.mockReturnValue(of(game));

    service.retrieve(trophySuiteId, playerId);

    expect(mockedTrophySuiteApiService.fetch).toHaveBeenCalledWith(trophySuiteId);
    expect(mockedTrophySuiteApiService.fetchTrophies).toHaveBeenCalledWith(trophySuiteId, playerId);
    expect(mockedTrophySuiteApiService.fetchGame).toHaveBeenCalledWith(trophySuiteId);

    expect(service.trophySuite()).toEqual(trophySuite);
    expect(service.trophies()).toEqual(earnedTrophies);
    expect(service.status()).toBe(LoadingStatus.FULLY_LOADED);
  });
});
