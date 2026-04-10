import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GameTrophiesComponent} from './game-trophies.component';

describe('GameTrophiesComponent', () => {
  let component: GameTrophiesComponent;
  let fixture: ComponentFixture<GameTrophiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameTrophiesComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GameTrophiesComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('trophies', []);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
