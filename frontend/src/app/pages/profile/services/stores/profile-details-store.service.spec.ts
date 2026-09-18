import { TestBed } from '@angular/core/testing';

import { ProfileDetailsStoreService } from './profile-details-store.service';

describe('ProfileDetailsStoreService', () => {
  let service: ProfileDetailsStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileDetailsStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
