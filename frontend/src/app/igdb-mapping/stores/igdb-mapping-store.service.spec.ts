import {beforeEach, describe, expect, it} from "vitest";
import {TestBed} from '@angular/core/testing';

import {IgdbMappingStoreService} from './igdb-mapping-store.service';

describe('IgdbMappingStoreService', () => {
  let store: IgdbMappingStoreService;

  beforeEach(async () => {
    store = TestBed.inject(IgdbMappingStoreService);
  });

  it('should be created', () => expect(store).toBeTruthy());
});
