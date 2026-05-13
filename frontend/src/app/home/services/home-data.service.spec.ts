import {TestBed} from '@angular/core/testing';

import {HomeDataService} from './home-data.service';
import {PlayerApiService} from '../../core/api/services/player-api.service';
import {GameApiService} from '../../core/api/services/game-api.service';
import {NotificationService} from '../../core/services/notification.service';

describe('HomeDataService', () => {
  let service: HomeDataService;

  const playerApiServiceMock = {
    fetchTopActive: vi.fn(),
  };
  const gameApiServiceMock = {
    searchRecent: vi.fn(),
  }
  const notificationServiceMock = {
    error: vi.fn(),
  }


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HomeDataService,
        {provide: PlayerApiService, useValue: playerApiServiceMock},
        {provide: GameApiService, useValue: gameApiServiceMock},
        {provide: NotificationService, useValue: notificationServiceMock},
      ]
    });
    service = TestBed.inject(HomeDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
