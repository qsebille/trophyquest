import {TestBed} from '@angular/core/testing';

import {DashboardIgdbStatsStoreService} from './dashboard-igdb-stats-store.service';

describe('DashboardIgdbStatsStoreService', () => {
  let service: DashboardIgdbStatsStoreService;

  beforeEach(() => {
    service = TestBed.inject(DashboardIgdbStatsStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
