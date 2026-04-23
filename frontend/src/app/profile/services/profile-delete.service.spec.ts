import {TestBed} from '@angular/core/testing';

import {ProfileDeleteService} from './profile-delete.service';

describe('ProfileDeleteService', () => {
  let service: ProfileDeleteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileDeleteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
