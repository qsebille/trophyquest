import type {MockedObject} from 'vitest';
import {beforeEach, describe, expect, it, vi} from 'vitest';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ActivatedRoute, convertToParamMap} from '@angular/router';

import {TrophySuitePageComponent} from './trophy-suite-page.component';
import {GameCoverStoreService} from '../../../core/stores/game-cover-store.service';

describe('TrophySuitePageComponent', () => {
  let component: TrophySuitePageComponent;
  let fixture: ComponentFixture<TrophySuitePageComponent>;

  let mockedGameCoverStoreService: MockedObject<GameCoverStoreService>;

  const mockTrophySuiteId = 'trophy-suite-123';
  const mockPlayerId = 'player-123';

  beforeEach(async () => {
    mockedGameCoverStoreService = {
      refreshForTrophySuite: vi.fn(),
    } as MockedObject<GameCoverStoreService>;

    await TestBed.configureTestingModule({
      imports: [TrophySuitePageComponent],
      providers: [
        {provide: GameCoverStoreService, useValue: mockedGameCoverStoreService},
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({trophySuiteId: mockTrophySuiteId}),
              queryParamMap: convertToParamMap({playerId: mockPlayerId}),
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TrophySuitePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should refresh game cover when trophy suite changes', () => {
    expect(mockedGameCoverStoreService.refreshForTrophySuite).toHaveBeenCalledWith(mockTrophySuiteId);
  });
});
