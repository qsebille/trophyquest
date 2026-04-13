import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GameTrophySuiteListComponent} from './game-trophy-suite-list.component';

describe('GameTrophySuiteListComponent', () => {
  let component: GameTrophySuiteListComponent;
  let fixture: ComponentFixture<GameTrophySuiteListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameTrophySuiteListComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GameTrophySuiteListComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('trophySuites', []);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
