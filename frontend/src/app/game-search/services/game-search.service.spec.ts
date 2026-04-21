import { TestBed } from '@angular/core/testing';

import { GameSearchService } from './game-search.service';

describe('GameSearchService', () => {
  let service: GameSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
