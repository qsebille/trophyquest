import {ComponentFixture, TestBed} from '@angular/core/testing';
import {beforeEach, describe, expect, it} from 'vitest';

import {TrophySuiteTrophyListComponent} from './trophy-suite-trophy-list.component';

describe('TrophySuiteTrophyListComponent', () => {
  let component: TrophySuiteTrophyListComponent;
  let fixture: ComponentFixture<TrophySuiteTrophyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrophySuiteTrophyListComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TrophySuiteTrophyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());
});
