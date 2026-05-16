import {TestBed} from '@angular/core/testing';

import {GamePlayersDataService} from './game-players-data.service';
import {GameApiService} from '../../core/api/services/game-api.service';
import {NotificationService} from '../../core/services/notification.service';

describe('GamePlayersDataService', () => {
  let service: GamePlayersDataService;

  const gameApiServiceMock = {
    fetchPlayers: vi.fn(),
  };
  const notificationServiceMock = {
    error: vi.fn(),
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GamePlayersDataService,
        {provide: GameApiService, useValue: gameApiServiceMock},
        {provide: NotificationService, useValue: notificationServiceMock},
      ],
    });
    service = TestBed.inject(GamePlayersDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
