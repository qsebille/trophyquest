import {TestBed} from '@angular/core/testing';

import {StatsApiService} from './stats-api.service';

describe('StatsApiService', () => {
  let service: StatsApiService;

  beforeEach(() => {
    service = TestBed.inject(StatsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
