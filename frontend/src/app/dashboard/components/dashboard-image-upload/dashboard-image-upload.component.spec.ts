import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardImageUploadComponent } from './dashboard-image-upload.component';

describe('DashboardImageUploadComponent', () => {
  let component: DashboardImageUploadComponent;
  let fixture: ComponentFixture<DashboardImageUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardImageUploadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardImageUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
