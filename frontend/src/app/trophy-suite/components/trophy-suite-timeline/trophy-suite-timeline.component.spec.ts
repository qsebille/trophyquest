import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrophySuiteTimelineComponent } from './trophy-suite-timeline.component';

describe('TrophySuiteTimelineComponent', () => {
  let component: TrophySuiteTimelineComponent;
  let fixture: ComponentFixture<TrophySuiteTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrophySuiteTimelineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrophySuiteTimelineComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('trophySuite', { id: '1', title: 'Test Game' });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
