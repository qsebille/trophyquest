import {TestBed} from '@angular/core/testing';

import {GameDetailsDataService} from './game-details-data.service';
import {GameApiService} from '../../core/api/services/game-api.service';
import {NotificationService} from '../../core/services/notification.service';

describe('GameDetailsDataService', () => {
  let service: GameDetailsDataService;

  const gameApiServiceMock = {
    fetchDetails: vi.fn(),
  };
  const notificationServiceMock = {
    error: vi.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GameDetailsDataService,
        {provide: GameApiService, useValue: gameApiServiceMock},
        {provide: NotificationService, useValue: notificationServiceMock},
      ],
    });
    service = TestBed.inject(GameDetailsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
