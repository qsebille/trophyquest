import {TestBed} from '@angular/core/testing';

import {TrophyApiService} from './trophy-api.service';

describe('TrophyApiService', () => {
  let service: TrophyApiService;

  beforeEach(() => {
    service = TestBed.inject(TrophyApiService);
  });

  it('should be created', () => expect(service).toBeTruthy());

});
