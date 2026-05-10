import { TestBed } from '@angular/core/testing';

import { IgdbMappingValidationService } from './igdb-mapping-validation.service';

describe('IgdbMappingValidationService', () => {
  let service: IgdbMappingValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IgdbMappingValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
