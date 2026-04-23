import { TestBed } from '@angular/core/testing';

import { PlayersAddService } from './players-add.service';

describe('PlayersAddService', () => {
  let service: PlayersAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayersAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
