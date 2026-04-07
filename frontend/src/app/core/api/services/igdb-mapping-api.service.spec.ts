import {TestBed} from '@angular/core/testing';

import {IgdbMappingApiService} from './igdb-mapping-api.service';

describe('IgdbMappingApiService', () => {
  let service: IgdbMappingApiService;

  beforeEach(() => {
    service = TestBed.inject(IgdbMappingApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
