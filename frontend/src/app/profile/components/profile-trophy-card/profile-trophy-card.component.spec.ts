import {ComponentFixture, TestBed} from '@angular/core/testing';
import {beforeEach, describe, expect, it} from 'vitest';
import {ProfileTrophyCardComponent} from './profile-trophy-card.component';
import {PlayerEarnedTrophy} from "../../../core/api/dtos/trophy/player-earned-trophy";

describe('ProfileTrophyCardComponent', () => {
  let component: ProfileTrophyCardComponent;
  let fixture: ComponentFixture<ProfileTrophyCardComponent>;

  const mockTrophy = {
    id: 'trophy-1',
    title: 'Trophy 1',
    trophyType: 'bronze',
    icon: 'trophy.png',
    description: 'A trophy',
    trophySuiteId: 'ts-1',
    trophySuiteTitle: 'Set 1',
    earnedAt: new Date(),
  } as PlayerEarnedTrophy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileTrophyCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileTrophyCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('trophy', mockTrophy);
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());
});
