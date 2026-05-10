import { TestBed } from '@angular/core/testing';

import { GameSearchDataService } from './game-search-data.service';

describe('GameSearchDataService', () => {
  let service: GameSearchDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameSearchDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
