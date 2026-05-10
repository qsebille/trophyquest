import { TestBed } from '@angular/core/testing';

import { ProfileTrophyDataService } from './profile-trophy-data.service';

describe('ProfileTrophyDataService', () => {
  let service: ProfileTrophyDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileTrophyDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
