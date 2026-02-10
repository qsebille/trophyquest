import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TrophySuiteSummaryComponent} from './trophy-suite-summary.component';
import {TrophySuite} from "../../../core/api/dtos/trophy-suite/trophy-suite";
import {TrophySuiteGameDetails} from "../../../core/api/dtos/game/trophy-suite-game-details";

describe('TrophySuiteSummaryComponent', () => {
    let component: TrophySuiteSummaryComponent;
    let fixture: ComponentFixture<TrophySuiteSummaryComponent>;

    const mockTrophySuite = {
        id: 'trophy-suite-123',
        title: 'Trophy Suite 123',
        platforms: ['ps5'],
        image: 'ts.png'
    } as TrophySuite;
    const mockGameDetails = {
        id: 'game-123',
        name: 'Game 123',
        summary: 'Some summary',
        genres: ['Action', 'Adventure'],
        releaseDate: '2023-01-01',
        images: []
    } as TrophySuiteGameDetails

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TrophySuiteSummaryComponent]
        }).compileComponents();


        fixture = TestBed.createComponent(TrophySuiteSummaryComponent);
        fixture.componentRef.setInput('trophySuite', mockTrophySuite);
        fixture.componentRef.setInput('gameDetails', mockGameDetails);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => expect(component).toBeTruthy());
});
