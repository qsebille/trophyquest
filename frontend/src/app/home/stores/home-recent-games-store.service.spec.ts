import {describe, expect, it, vi} from 'vitest';
import {TestBed} from '@angular/core/testing';

import {HomeRecentGamesStore} from './home-recent-games-store.service';
import {GameApiService} from "../../core/api/services/game-api.service";

describe('HomeRecentGamesStore', () => {
  let service: HomeRecentGamesStore;

  const mockGameApiService = {
    searchRecent: vi.fn()
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: GameApiService, useValue: mockGameApiService}
      ]
    });
    service = TestBed.inject(HomeRecentGamesStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
