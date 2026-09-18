import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SuiteCardComponent} from './suite-card.component';

describe('AssociationSuiteCardComponent', () => {
  let component: SuiteCardComponent;
  let fixture: ComponentFixture<SuiteCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuiteCardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SuiteCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
