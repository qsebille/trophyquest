import {TestBed} from '@angular/core/testing';
import {GamePageStoreService} from './game-page-store.service';
import {GameApiService} from '../../core/api/services/game-api.service';
import {TrophySuiteApiService} from '../../core/api/services/trophy-suite-api.service';
import {of, throwError} from 'rxjs';
import {EarnedTrophy} from '../../core/api/dtos/trophy/earned-trophy';
import {beforeEach, describe, expect, it, vi} from 'vitest';

describe('GamePageStoreService', () => {
  let service: GamePageStoreService;
  let gameApiServiceMock: any;
  let trophySuiteApiServiceMock: any;

  beforeEach(() => {
    gameApiServiceMock = {
      fetchDetails: vi.fn(),
      fetchTrophySuites: vi.fn()
    };
    trophySuiteApiServiceMock = {
      fetchTrophies: vi.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        GamePageStoreService,
        {provide: GameApiService, useValue: gameApiServiceMock},
        {provide: TrophySuiteApiService, useValue: trophySuiteApiServiceMock},
      ]
    });
    service = TestBed.inject(GamePageStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should continue to fetch trophies after a failed request', () => {
    const trophySuiteId1 = 'suite-1';
    const trophySuiteId2 = 'suite-2';
    const playerId = 'player-1';
    const trophies: EarnedTrophy[] = [{id: 't1', name: 'Trophy 1'} as unknown as EarnedTrophy];

    // First call fails
    trophySuiteApiServiceMock.fetchTrophies.mockReturnValueOnce(throwError(() => new Error('API Error')));
    // Second call succeeds
    trophySuiteApiServiceMock.fetchTrophies.mockReturnValueOnce(of(trophies));

    service.fetchTrophies(trophySuiteId1, playerId);
    expect(trophySuiteApiServiceMock.fetchTrophies).toHaveBeenCalledWith(trophySuiteId1, playerId);
    expect(service.trophies()).toEqual([]);

    service.fetchTrophies(trophySuiteId2, playerId);
    expect(trophySuiteApiServiceMock.fetchTrophies).toHaveBeenCalledWith(trophySuiteId2, playerId);
    expect(service.trophies()).toEqual(trophies);
  });
});
