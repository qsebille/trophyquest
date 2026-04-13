import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameTrophyFiltersComponent } from './game-trophy-filters.component';

describe('GameTrophyFiltersComponent', () => {
  let component: GameTrophyFiltersComponent;
  let fixture: ComponentFixture<GameTrophyFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameTrophyFiltersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameTrophyFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
