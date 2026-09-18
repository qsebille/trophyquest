import {TestBed} from '@angular/core/testing';

import {GamePlayersStoreService} from './game-players-store.service';
import {GameApiService} from '../../../../core/api/services/game-api.service';
import {NotificationService} from '../../../../core/services/notification.service';

describe('GamePlayersStoreService', () => {
  let service: GamePlayersStoreService;

  const gameApiServiceMock = {
    fetchPlayers: vi.fn(),
  };
  const notificationServiceMock = {
    error: vi.fn(),
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GamePlayersStoreService,
        {provide: GameApiService, useValue: gameApiServiceMock},
        {provide: NotificationService, useValue: notificationServiceMock},
      ],
    });
    service = TestBed.inject(GamePlayersStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
