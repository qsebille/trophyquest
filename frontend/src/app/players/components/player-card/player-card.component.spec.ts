import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PlayerCardComponent} from './player-card.component';
import {PlayerSearchItem} from "../../../core/api/dtos/player/player-search-item";

describe('PlayerCardComponent', () => {
  let component: PlayerCardComponent;
  let fixture: ComponentFixture<PlayerCardComponent>;

  const mockPlayerSearchItem = {
    id: 'player-123',
    pseudo: 'Player 123',
    avatar: 'avatar.png',
    nbPlayedGames: 100,
    nbEarnedPlatinum: 1,
    nbEarnedGold: 2,
    nbEarnedSilver: 3,
    nbEarnedBronze: 4,
  } as PlayerSearchItem;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerCardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PlayerCardComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('playerSearchItem', mockPlayerSearchItem);
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should compute trophy count per type', () => {
    fixture.componentRef.setInput('playerSearchItem', mockPlayerSearchItem);
    fixture.detectChanges();

    expect(component.trophyCount()).toEqual({platinum: 1, gold: 2, silver: 3, bronze: 4});
  });
});
