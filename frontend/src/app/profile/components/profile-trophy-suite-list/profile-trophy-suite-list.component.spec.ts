import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfileTrophySuiteListComponent} from './profile-trophy-suite-list.component';

describe('ProfileTrophySuiteListComponent', () => {
    let component: ProfileTrophySuiteListComponent;
    let fixture: ComponentFixture<ProfileTrophySuiteListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ProfileTrophySuiteListComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ProfileTrophySuiteListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => expect(component).toBeTruthy());
});
