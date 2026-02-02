import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfileTrophyListComponent} from './profile-trophy-list.component';

describe('ProfileTrophyListComponent', () => {
    let component: ProfileTrophyListComponent;
    let fixture: ComponentFixture<ProfileTrophyListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ProfileTrophyListComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ProfileTrophyListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => expect(component).toBeTruthy());
});
