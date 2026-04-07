import {TestBed} from '@angular/core/testing';

import {DashboardImageStatsStoreService} from './dashboard-image-stats-store.service';

describe('DashboardImageStatsStoreService', () => {
  let service: DashboardImageStatsStoreService;

  beforeEach(() => {
    service = TestBed.inject(DashboardImageStatsStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
