import {TestBed} from '@angular/core/testing';

import {GameDetailsStoreService} from './game-details-store.service';
import {GameApiService} from '../../../../core/api/services/game-api.service';
import {NotificationService} from '../../../../core/services/notification.service';

describe('GameDetailsStoreService', () => {
  let service: GameDetailsStoreService;

  const gameApiServiceMock = {
    fetchDetails: vi.fn(),
  };
  const notificationServiceMock = {
    error: vi.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GameDetailsStoreService,
        {provide: GameApiService, useValue: gameApiServiceMock},
        {provide: NotificationService, useValue: notificationServiceMock},
      ],
    });
    service = TestBed.inject(GameDetailsStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
