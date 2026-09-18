import { TestBed } from '@angular/core/testing';

import { GameDetailsApiService } from './game-details-api.service';

describe('GameDetailsApiService', () => {
  let service: GameDetailsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameDetailsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
