import {TestBed} from '@angular/core/testing';

import {TrophySuiteApiService} from './trophy-suite-api.service';

describe('TrophySuiteApiService', () => {
  let service: TrophySuiteApiService;

  beforeEach(() => {
    service = TestBed.inject(TrophySuiteApiService);
  });

  it('should be created', () => expect(service).toBeTruthy());
});
