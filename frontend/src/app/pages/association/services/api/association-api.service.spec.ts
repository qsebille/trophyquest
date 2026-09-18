import { TestBed } from '@angular/core/testing';

import { AssociationApiService } from './association-api.service';

describe('AssociationApiService', () => {
  let service: AssociationApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssociationApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
