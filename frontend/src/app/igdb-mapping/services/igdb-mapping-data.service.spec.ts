import {TestBed} from '@angular/core/testing';

import {IgdbMappingDataService} from './igdb-mapping-data.service';
import {IgdbMappingApiService} from '../../core/api/services/igdb-mapping-api.service';
import {NotificationService} from '../../core/services/notification.service';

describe('IgdbMappingDataService', () => {
  let service: IgdbMappingDataService;

  const igdbMappingApiServieMock = {
    searchPending: vi.fn(),
  }
  const notificationService = {
    error: vi.fn(),
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        IgdbMappingDataService,
        {provide: IgdbMappingApiService, useValue: igdbMappingApiServieMock},
        {provide: NotificationService, useValue: notificationService},
      ]
    });
    service = TestBed.inject(IgdbMappingDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('reset', () => {
    it('should reset internal state', () => {
      service.reset();
      expect(service.mappingList()).toEqual([]);
      expect(service.total()).toBe(0);
      expect(service.isLoading()).toBeFalsy();
      expect(service.isError()).toBeFalsy();
    })
  })
});
