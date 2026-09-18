import { TestBed } from '@angular/core/testing';

import { HomeGameStoreService } from './home-game-store.service';

describe('HomeGameStoreService', () => {
  let service: HomeGameStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeGameStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
