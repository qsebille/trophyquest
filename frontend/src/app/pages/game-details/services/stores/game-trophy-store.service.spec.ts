import {TestBed} from '@angular/core/testing';

import {GameTrophyStoreService} from './game-trophy-store.service';
import {GameApiService} from '../../../../core/api/services/game-api.service';
import {NotificationService} from '../../../../core/services/notification.service';
import {TrophySuiteApiService} from '../../../../core/api/services/trophy-suite-api.service';

describe('GameTrophyStoreService', () => {
  let service: GameTrophyStoreService;

  const gameApiServiceMock = {
    fetchTrophySuites: vi.fn(),
  };
  const trophySuiteApiServiceMock = {
    fetchTrophies: vi.fn(),
  };
  const notificationService = {
    error: vi.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GameTrophyStoreService,
        {provide: GameApiService, useValue: gameApiServiceMock},
        {provide: TrophySuiteApiService, useValue: trophySuiteApiServiceMock},
        {provide: NotificationService, useValue: notificationService},
      ],
    });
    service = TestBed.inject(GameTrophyStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
