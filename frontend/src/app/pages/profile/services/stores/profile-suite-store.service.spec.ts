import { TestBed } from '@angular/core/testing';

import { ProfileSuiteStoreService } from './profile-suite-store.service';

describe('ProfileSuiteStoreService', () => {
  let service: ProfileSuiteStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileSuiteStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
