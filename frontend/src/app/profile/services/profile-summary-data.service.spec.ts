import { TestBed } from '@angular/core/testing';

import { ProfileSummaryDataService } from './profile-summary-data.service';

describe('ProfileSummaryDataService', () => {
  let service: ProfileSummaryDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileSummaryDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
