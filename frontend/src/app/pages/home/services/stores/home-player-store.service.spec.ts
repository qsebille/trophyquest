import { TestBed } from '@angular/core/testing';

import { HomePlayerStoreService } from './home-player-store.service';

describe('HomePlayerStoreService', () => {
  let service: HomePlayerStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomePlayerStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
