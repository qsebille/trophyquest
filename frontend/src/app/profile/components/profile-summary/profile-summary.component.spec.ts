import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfileSummaryComponent} from './profile-summary.component';
import {Player} from "../../../core/api/dtos/player/player";
import {PlayerStats} from "../../../core/api/dtos/player/player-stats";

describe('ProfileSummaryComponent', () => {
    let component: ProfileSummaryComponent;
    let fixture: ComponentFixture<ProfileSummaryComponent>;


    const mockPlayer = {id: 'player-123', pseudo: 'PlayerId', avatar: 'avatar.png'} as Player;
    const mockPlayerStats = {
        totalTrophySuitesPlayed: 100,
        totalPlatinumTrophies: 1,
        totalGoldTrophies: 2,
        totalSilverTrophies: 3,
        totalBronzeTrophies: 4,
    } as PlayerStats;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ProfileSummaryComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ProfileSummaryComponent);
        component = fixture.componentInstance;

        fixture.componentRef.setInput('player', mockPlayer);
        fixture.componentRef.setInput('playerStats', mockPlayerStats);
        fixture.detectChanges();
    });

    it('should create', () => expect(component).toBeTruthy());
});
