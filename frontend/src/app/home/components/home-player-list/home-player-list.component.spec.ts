import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HomePlayerListComponent} from './home-player-list.component';

describe('HomePlayerListComponent', () => {
    let component: HomePlayerListComponent;
    let fixture: ComponentFixture<HomePlayerListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HomePlayerListComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(HomePlayerListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => expect(component).toBeTruthy());
});
