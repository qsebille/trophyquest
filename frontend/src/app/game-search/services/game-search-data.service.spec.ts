import {TestBed} from '@angular/core/testing';

import {GameSearchDataService} from './game-search-data.service';
import {GameApiService} from '../../core/api/services/game-api.service';
import {NotificationService} from '../../core/services/notification.service';

describe('GameSearchDataService', () => {
  let service: GameSearchDataService;

  const gameApiServiceMock = {
    search: vi.fn(),
  };
  const notificationService = {
    error: vi.fn(),
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GameSearchDataService,
        {provide: GameApiService, useValue: gameApiServiceMock},
        {provide: NotificationService, useValue: notificationService}
      ]
    });
    service = TestBed.inject(GameSearchDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
