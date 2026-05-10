import { TestBed } from '@angular/core/testing';

import { IgdbMappingDataService } from './igdb-mapping-data.service';

describe('IgdbMappingDataService', () => {
  let service: IgdbMappingDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IgdbMappingDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
