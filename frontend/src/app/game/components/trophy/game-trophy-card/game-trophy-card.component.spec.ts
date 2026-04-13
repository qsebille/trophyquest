import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GameTrophyCardComponent} from './game-trophy-card.component';
import {EarnedTrophy} from '../../../../core/api/dtos/trophy/earned-trophy';

describe('GameTrophyCardComponent', () => {
  let component: GameTrophyCardComponent;
  let fixture: ComponentFixture<GameTrophyCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameTrophyCardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GameTrophyCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('trophy', {icon: 'trophy.png'} as unknown as EarnedTrophy)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
