import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GameTrophySuitesComponent} from './game-trophy-suites.component';

describe('GameTrophySuitesComponent', () => {
  let component: GameTrophySuitesComponent;
  let fixture: ComponentFixture<GameTrophySuitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameTrophySuitesComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GameTrophySuitesComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('trophySuites', []);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
