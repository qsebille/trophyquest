import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ProfileTrophySuiteCardComponent} from './profile-trophy-suite-card.component';
import {PlayedTrophySuiteSearchElement} from "../../../core/api/dtos/trophy-suite/played-trophy-suite-search-element";

describe('ProfileTrophySuiteCardComponent', () => {
    let component: ProfileTrophySuiteCardComponent;
    let fixture: ComponentFixture<ProfileTrophySuiteCardComponent>;

    const mockPlayerTrophySuite = {
        id: 'suite-123',
        name: 'Suite 123',
        platforms: ['PS4'],
        imageUrl: 'suite.png',
        lastPlayedAt: new Date(),
        totalTrophies: 100,
        totalEarnedPlatinum: 1,
        totalEarnedGold: 5,
        totalEarnedSilver: 10,
        totalEarnedBronze: 20,
    } as PlayedTrophySuiteSearchElement

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ProfileTrophySuiteCardComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(ProfileTrophySuiteCardComponent);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('trophySuite', mockPlayerTrophySuite);
        fixture.detectChanges();
    });

    it('should create', () => expect(component).toBeTruthy());
});
