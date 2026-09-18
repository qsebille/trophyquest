import {ComponentFixture, TestBed} from '@angular/core/testing';
import {beforeEach, describe, expect, it} from 'vitest';

import {ProfileSuiteCardComponent} from './profile-suite-card.component';
import {PlayerTrophySuite} from "../../../../../core/api/dtos/trophy-suite/player-trophy-suite";

describe('ProfileSuiteCardComponent', () => {
  let component: ProfileSuiteCardComponent;
  let fixture: ComponentFixture<ProfileSuiteCardComponent>;

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
      imports: [ProfileSuiteCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileSuiteCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('trophySuite', mockPlayerTrophySuite);
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());
});
