import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TrophySuiteTrophyCardComponent} from './trophy-suite-trophy-card.component';
import {EarnedTrophy} from "../../../core/api/dtos/trophy/earned-trophy";

describe('TrophySuiteTrophyCardComponent', () => {
    let component: TrophySuiteTrophyCardComponent;
    let fixture: ComponentFixture<TrophySuiteTrophyCardComponent>;

    const mockTrophy = {id: 'trophy-123', title: 'Trophy 123', icon: 'trophy.png'} as EarnedTrophy;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TrophySuiteTrophyCardComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(TrophySuiteTrophyCardComponent);
        fixture.componentRef.setInput('trophy', mockTrophy);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => expect(component).toBeTruthy());
});
