import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HomePlayerCardComponent} from './home-player-card.component';
import {Player} from "../../../core/api/dtos/player/player";

describe('HomePlayerCardComponent', () => {
    let component: HomePlayerCardComponent;
    let fixture: ComponentFixture<HomePlayerCardComponent>;

    const mockPlayer = {id: '001', pseudo: 'Pseudo', avatar: 'avatar.png'} as Player;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HomePlayerCardComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(HomePlayerCardComponent);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('player', mockPlayer);
        fixture.componentRef.setInput('trophyCount', 3);
        fixture.detectChanges();
    });

    it('should create', () => expect(component).toBeTruthy());
});
