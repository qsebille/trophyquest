import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerContainerComponent } from './spinner-container.component';

describe('SpinnerContainerComponent', () => {
  let component: SpinnerContainerComponent;
  let fixture: ComponentFixture<SpinnerContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpinnerContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpinnerContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
