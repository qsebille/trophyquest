import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PlayerCardComponent} from './player-card.component';
import {PlayerSearchItem} from "../../../core/api/dtos/player/player-search-item";

describe('PlayerCardComponent', () => {
    let component: PlayerCardComponent;
    let fixture: ComponentFixture<PlayerCardComponent>;

    const mockPlayerSearchItem = {
        id: 'player-123',
        pseudo: 'Player 123',
        avatar: 'avatar.png',
        totalPlayedGames: 100,
        totalEarnedPlatinum: 1,
        totalEarnedGold: 2,
        totalEarnedSilver: 3,
        totalEarnedBronze: 4,
    } as PlayerSearchItem;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PlayerCardComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(PlayerCardComponent);
        component = fixture.componentInstance;

        fixture.componentRef.setInput('playerSearchItem', mockPlayerSearchItem);
        fixture.detectChanges();
    });

    it('should create', () => expect(component).toBeTruthy());

    it('should compute trophy count per type', () => {
        fixture.componentRef.setInput('playerSearchItem', mockPlayerSearchItem);
        fixture.detectChanges();

        expect(component.trophyCount()).toEqual({platinum: 1, gold: 2, silver: 3, bronze: 4});
    });
});
