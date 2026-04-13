import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GameTrophySuiteCardComponent} from './game-trophy-suite-card.component';
import {GameTrophySuiteDisplayMode} from '../../../models/game-trophy-suite-display-mode.enum';

describe('GameTrophySuiteCardComponent', () => {
  let component: GameTrophySuiteCardComponent;
  let fixture: ComponentFixture<GameTrophySuiteCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameTrophySuiteCardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GameTrophySuiteCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('trophySuite', {} as unknown as GameTrophySuiteCardComponent)
    fixture.componentRef.setInput('displayMode', GameTrophySuiteDisplayMode.NONE)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
