import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardIgdbMappingComponent } from './dashboard-igdb-mapping.component';

describe('DashboardIgdbMappingComponent', () => {
  let component: DashboardIgdbMappingComponent;
  let fixture: ComponentFixture<DashboardIgdbMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardIgdbMappingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardIgdbMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
