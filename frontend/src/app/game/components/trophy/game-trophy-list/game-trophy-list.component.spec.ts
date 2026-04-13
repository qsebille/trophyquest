import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameTrophyListComponent } from './game-trophy-list.component';

describe('GameTrophyListComponent', () => {
  let component: GameTrophyListComponent;
  let fixture: ComponentFixture<GameTrophyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameTrophyListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameTrophyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
