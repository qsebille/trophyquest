import { TestBed } from '@angular/core/testing';

import { GameSuiteStoreService } from './game-suite-store.service';

describe('GameSuiteStoreService', () => {
  let service: GameSuiteStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameSuiteStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
