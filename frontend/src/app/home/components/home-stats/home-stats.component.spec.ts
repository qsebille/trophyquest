import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeStatsComponent} from './home-stats.component';
import {HomeStats} from "../../../core/models/dto/home-stats";

describe('HomeStatsComponent', () => {
    let component: HomeStatsComponent;
    let fixture: ComponentFixture<HomeStatsComponent>;

    const stats: HomeStats = {
        totalPlayers: 0,
        totalGames: 1,
        totalTrophies: 2,
        recentPlayers: 3,
        recentGames: 4,
        recentTrophies: 5
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HomeStatsComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(HomeStatsComponent);
        fixture.componentRef.setInput('stats', stats);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => expect(component).toBeTruthy());
});
