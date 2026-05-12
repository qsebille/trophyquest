import {TestBed} from '@angular/core/testing';

import {IgdbMappingValidationService} from './igdb-mapping-validation.service';
import {NotificationService} from '../../core/services/notification.service';
import {IgdbMappingApiService} from '../../core/api/services/igdb-mapping-api.service';

describe('IgdbMappingValidationService', () => {
  let service: IgdbMappingValidationService;

  const igdbMappingApiServiceMock = {
    validateCandidate: vi.fn(),
    rejectCandidates: vi.fn(),
  }
  const notificationServiceMock = {
    success: vi.fn(),
    error: vi.fn(),
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        IgdbMappingValidationService,
        {provide: IgdbMappingApiService, useValue: igdbMappingApiServiceMock},
        {provide: NotificationService, useValue: notificationServiceMock},
      ]
    });
    service = TestBed.inject(IgdbMappingValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
