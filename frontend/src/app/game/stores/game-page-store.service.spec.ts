import { TestBed } from '@angular/core/testing';

import { GamePageStoreService } from './game-page-store.service';

describe('GamePageStoreService', () => {
  let service: GamePageStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GamePageStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
