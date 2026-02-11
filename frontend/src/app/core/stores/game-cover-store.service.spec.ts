import { TestBed } from '@angular/core/testing';

import { GameCoverStoreService } from './game-cover-store.service';

describe('GameCoverStoreService', () => {
  let service: GameCoverStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameCoverStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
