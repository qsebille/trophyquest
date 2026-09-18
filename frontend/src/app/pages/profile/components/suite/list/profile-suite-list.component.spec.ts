import {ComponentFixture, TestBed} from '@angular/core/testing';
import {beforeEach, describe, expect, it} from 'vitest';
import {ProfileSuiteListComponent} from './profile-suite-list.component';

describe('ProfileSuiteListComponent', () => {
  let component: ProfileSuiteListComponent;
  let fixture: ComponentFixture<ProfileSuiteListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileSuiteListComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProfileSuiteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());
});
