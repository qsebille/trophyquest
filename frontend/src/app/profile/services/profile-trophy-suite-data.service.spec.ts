import { TestBed } from '@angular/core/testing';

import { ProfileTrophySuiteDataService } from './profile-trophy-suite-data.service';

describe('ProfileTrophySuiteDataService', () => {
  let service: ProfileTrophySuiteDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileTrophySuiteDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
