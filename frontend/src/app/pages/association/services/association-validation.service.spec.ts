import { TestBed } from '@angular/core/testing';

import { AssociationValidationService } from './association-validation.service';

describe('AssociationValidationService', () => {
  let service: AssociationValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssociationValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
