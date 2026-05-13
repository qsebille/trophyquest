import {TestBed} from '@angular/core/testing';

import {PlayersAddService} from './players-add.service';
import {PlayerApiService} from '../../core/api/services/player-api.service';
import {NotificationService} from '../../core/services/notification.service';

describe('PlayersAddService', () => {
  let service: PlayersAddService;

  const playerApiServiceMock = {
    fetchByPseudo: vi.fn(),
    addPlayer: vi.fn(),
  }

  const notificationServiceMock = {
    info: vi.fn(),
    success: vi.fn(),
    error: vi.fn(),
  }


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PlayersAddService,
        {provide: PlayerApiService, useValue: playerApiServiceMock},
        {provide: NotificationService, useValue: notificationServiceMock},
      ],
    });
    service = TestBed.inject(PlayersAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
