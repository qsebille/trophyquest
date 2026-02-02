import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TrophySuiteTrophyFiltersComponent} from './trophy-suite-trophy-filters.component';

describe('TrophySuiteTrophyFiltersComponent', () => {
    let component: TrophySuiteTrophyFiltersComponent;
    let fixture: ComponentFixture<TrophySuiteTrophyFiltersComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TrophySuiteTrophyFiltersComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(TrophySuiteTrophyFiltersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => expect(component).toBeTruthy());
});
