import {TestBed} from '@angular/core/testing';

import {GameTrophyDataService} from './game-trophy-data.service';
import {GameApiService} from '../../core/api/services/game-api.service';
import {NotificationService} from '../../core/services/notification.service';
import {TrophySuiteApiService} from '../../core/api/services/trophy-suite-api.service';

describe('GameTrophyDataService', () => {
  let service: GameTrophyDataService;

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
        GameTrophyDataService,
        {provide: GameApiService, useValue: gameApiServiceMock},
        {provide: TrophySuiteApiService, useValue: trophySuiteApiServiceMock},
        {provide: NotificationService, useValue: notificationService},
      ],
    });
    service = TestBed.inject(GameTrophyDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
