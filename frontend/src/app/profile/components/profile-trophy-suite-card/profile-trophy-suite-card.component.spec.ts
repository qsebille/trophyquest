import {ComponentFixture, TestBed} from '@angular/core/testing';
import {beforeEach, describe, expect, it} from 'vitest';

import {ProfileTrophySuiteCardComponent} from './profile-trophy-suite-card.component';
import {PlayerTrophySuite} from "../../../core/api/dtos/trophy-suite/player-trophy-suite";

describe('ProfileTrophySuiteCardComponent', () => {
  let component: ProfileTrophySuiteCardComponent;
  let fixture: ComponentFixture<ProfileTrophySuiteCardComponent>;

  const mockPlayerTrophySuite = {
    id: 'suite-123',
    name: 'Suite 123',
    platforms: ['PS4'],
    imageUrl: 'suite.png',
    lastPlayedAt: new Date(),
    nbTrophies: 100,
    nbEarnedPlatinum: 1,
    nbEarnedGold: 5,
    nbEarnedSilver: 10,
    nbEarnedBronze: 20,
  } as PlayerTrophySuite

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileTrophySuiteCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileTrophySuiteCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('trophySuite', mockPlayerTrophySuite);
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());
});
