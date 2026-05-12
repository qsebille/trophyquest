import {TestBed} from '@angular/core/testing';

import {PlayersDataService} from './players-data.service';
import {NotificationService} from '../../core/services/notification.service';
import {PlayerApiService} from '../../core/api/services/player-api.service';

describe('PlayersDataService', () => {
  let service: PlayersDataService;

  const playerApiServiceMock = {
    search: vi.fn(),
  }
  const notificationServiceMock = {
    error: vi.fn(),
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PlayersDataService,
        {provide: PlayerApiService, useValue: playerApiServiceMock},
        {provide: NotificationService, useValue: notificationServiceMock}
      ]
    });
    service = TestBed.inject(PlayersDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('reset', () => {
    it('should reset the service', () => {
      service.reset();
      const pagination = service.pagination();
      expect(pagination?.content).toEqual([]);
      expect(pagination?.page).toBe(0);
      expect(pagination?.total).toBe(0);
      expect(pagination?.size).toBe(20);
      expect(service.isLoading()).toBeFalsy();
      expect(service.isError()).toBeFalsy();
    });
  });
});
