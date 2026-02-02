import { TestBed } from '@angular/core/testing';

import { IdleReloadService } from './idle-reload.service';

describe('IdleReloadService', () => {
  let service: IdleReloadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdleReloadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
