import {TestBed} from '@angular/core/testing';

import {ProfileDeleteService} from './profile-delete.service';
import {PlayerApiService} from '../../core/api/services/player-api.service';
import {NotificationService} from '../../core/services/notification.service';
import {NavigatorService} from '../../core/services/navigator.service';

describe('ProfileDeleteService', () => {
  let service: ProfileDeleteService;

  const playerApiServiceMock = {
    deletePlayer: vi.fn(),
  }
  const notificationServiceMock = {
    success: vi.fn(),
    error: vi.fn(),
  }
  const navigatorServiceMock = {
    goToPlayersPage: vi.fn(),
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProfileDeleteService,
        {provide: PlayerApiService, useValue: playerApiServiceMock},
        {provide: NotificationService, useValue: notificationServiceMock},
        {provide: NavigatorService, useValue: navigatorServiceMock},
      ]
    });
    service = TestBed.inject(ProfileDeleteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
