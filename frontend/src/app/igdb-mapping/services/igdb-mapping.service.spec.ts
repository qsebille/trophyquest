import { TestBed } from '@angular/core/testing';

import { IgdbMappingService } from './igdb-mapping.service';

describe('IgdbMappingService', () => {
  let service: IgdbMappingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IgdbMappingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
