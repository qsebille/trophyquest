import { TestBed } from '@angular/core/testing';

import { AssociationStoreService } from './association-store.service';

describe('AssociationStoreService', () => {
  let service: AssociationStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssociationStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
