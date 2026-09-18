import {ComponentFixture, TestBed} from '@angular/core/testing';
import {beforeEach, describe, expect, it} from 'vitest';

import {ProfileDetailsComponent} from './profile-details.component';
import {PlayerSearchItem} from '../../../../core/api/dtos/player/player-search-item';

describe('ProfileDetailsComponent', () => {
  let component: ProfileDetailsComponent;
  let fixture: ComponentFixture<ProfileDetailsComponent>;

  const mockPlayerSearchItem = {
    id: 'player-123',
    pseudo: 'PlayerId',
    avatar: 'avatar.png',
    nbEarnedPlatinum: 1,
    nbEarnedGold: 20,
    nbEarnedSilver: 300,
    nbEarnedBronze: 4000,
  } as PlayerSearchItem;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileDetailsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProfileDetailsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('player', mockPlayerSearchItem);
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  describe('Component setup', () => {
    it('should set inputs', () => {
      expect(component.details()).toEqual(mockPlayerSearchItem);
      expect(component.isLoading()).toEqual(false);
      expect(component.isError()).toEqual(false);
    });

    it('should compute total earned trophies', () => {
      expect(component.totalEarnedTrophies()).toBe(4321);
    })
  })
});
