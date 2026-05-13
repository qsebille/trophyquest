import {TestBed} from '@angular/core/testing';

import {GameDataService} from './game-data.service';
import {GameApiService} from '../../core/api/services/game-api.service';
import {TrophySuiteApiService} from '../../core/api/services/trophy-suite-api.service';
import {NotificationService} from '../../core/services/notification.service';

describe('GameDataService', () => {
  let service: GameDataService;

  const gameApiServiceMock = {
    fetchDetails: vi.fn(),
    fetchTrophySuites: vi.fn(),
    fetchPlayers: vi.fn(),
  };
  const trophySuiteApiServiceMock = {
    fetchTrophies: vi.fn(),
  }
  const notificationServiceMock = {
    error: vi.fn(),
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GameDataService,
        {provide: GameApiService, useValue: gameApiServiceMock},
        {provide: TrophySuiteApiService, useValue: trophySuiteApiServiceMock},
        {provide: NotificationService, useValue: notificationServiceMock},
      ]
    });
    service = TestBed.inject(GameDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
