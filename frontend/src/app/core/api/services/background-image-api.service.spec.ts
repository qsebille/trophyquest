import {TestBed} from '@angular/core/testing';

import {BackgroundImageApiService} from './background-image-api.service';

describe('BackgroundImageApiService', () => {
  let service: BackgroundImageApiService;

  beforeEach(() => {
    service = TestBed.inject(BackgroundImageApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
