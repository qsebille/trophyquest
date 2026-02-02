import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeGameCardComponent} from './home-game-card.component';
import {RecentGame} from "../../../core/api/dtos/game/recent-game";

describe('HomeGameCardComponent', () => {
    let component: HomeGameCardComponent;
    let fixture: ComponentFixture<HomeGameCardComponent>;

    const mockGame = {id: '001', name: 'Game 1', imageUrl: 'game.png'} as RecentGame

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HomeGameCardComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(HomeGameCardComponent);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('game', mockGame);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
