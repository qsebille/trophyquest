import {TestBed} from '@angular/core/testing';

import {ProfileTrophySuiteDataService} from './profile-trophy-suite-data.service';

describe('ProfileTrophySuiteDataService', () => {
  let service: ProfileTrophySuiteDataService;

  const playerApiServiceMock = {
    searchPlayedTrophySuites: vi.fn(),
  }
  const notificationServiceMock = {
    error: vi.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProfileTrophySuiteDataService,
        {provide: playerApiServiceMock, useValue: playerApiServiceMock},
        {provide: notificationServiceMock, useValue: notificationServiceMock},
      ]
    });
    service = TestBed.inject(ProfileTrophySuiteDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
