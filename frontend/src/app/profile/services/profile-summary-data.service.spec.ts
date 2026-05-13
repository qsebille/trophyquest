import {TestBed} from '@angular/core/testing';

import {ProfileSummaryDataService} from './profile-summary-data.service';
import {PlayerApiService} from '../../core/api/services/player-api.service';
import {NotificationService} from '../../core/services/notification.service';
import {emptyPlayerSearchItem} from '../../core/api/dtos/player/player-search-item';

describe('ProfileSummaryDataService', () => {
  let service: ProfileSummaryDataService;

  const playerApiServiceMock = {
    fetch: vi.fn(),
  }
  const notificationServiceMock = {
    error: vi.fn(),
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProfileSummaryDataService,
        {provide: PlayerApiService, useValue: playerApiServiceMock},
        {provide: NotificationService, useValue: notificationServiceMock},
      ]
    });
    service = TestBed.inject(ProfileSummaryDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('reset', () => {
    it('should reset loading', () => {
      service.reset();
      expect(service.isLoading()).toBeFalsy();
    });

    it('should reset error', () => {
      service.reset();
      expect(service.isError()).toBeFalsy();
    });

    it('should reset data', () => {
      service.reset();
      expect(service.data()).toEqual(emptyPlayerSearchItem);
    })
  });
});
