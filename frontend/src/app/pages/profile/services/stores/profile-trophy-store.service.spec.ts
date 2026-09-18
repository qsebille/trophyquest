import { TestBed } from '@angular/core/testing';

import { ProfileTrophyStoreService } from './profile-trophy-store.service';

describe('ProfileTrophyStoreService', () => {
  let service: ProfileTrophyStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileTrophyStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
