import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TrophySuiteSummaryComponent} from './trophy-suite-summary.component';
import {TrophySuite} from "../../../core/api/dtos/trophy-suite/trophy-suite";

describe('TrophySuiteSummaryComponent', () => {
    let component: TrophySuiteSummaryComponent;
    let fixture: ComponentFixture<TrophySuiteSummaryComponent>;

    const mockTrophySuite = {
        id: 'trophy-suite-123',
        title: 'Trophy Suite 123',
        platforms: ['ps5'],
        image: 'ts.png'
    } as TrophySuite;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TrophySuiteSummaryComponent]
        }).compileComponents();


        fixture = TestBed.createComponent(TrophySuiteSummaryComponent);
        fixture.componentRef.setInput('trophySuite', mockTrophySuite);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => expect(component).toBeTruthy());
});
