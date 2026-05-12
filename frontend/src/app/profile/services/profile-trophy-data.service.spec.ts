import {TestBed} from '@angular/core/testing';

import {ProfileTrophyDataService} from './profile-trophy-data.service';
import {NotificationService} from '../../core/services/notification.service';
import {PlayerApiService} from '../../core/api/services/player-api.service';

describe('ProfileTrophyDataService', () => {
  let service: ProfileTrophyDataService;

  const playerApiServiceMock = {
    searchEarnedTrophies: vi.fn(),
  }
  const notificationServiceMock = {
    error: vi.fn(),
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProfileTrophyDataService,
        {provide: PlayerApiService, useValue: playerApiServiceMock},
        {provide: NotificationService, useValue: notificationServiceMock},
      ]
    });
    service = TestBed.inject(ProfileTrophyDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
