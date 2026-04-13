import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameTrophyCardComponent } from './game-trophy-card.component';

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
