import {ComponentFixture, TestBed} from '@angular/core/testing';

import {IgdbMappingGameCardComponent} from './igdb-mapping-game-card.component';
import {IgdbMapping} from "../../../core/api/dtos/candidate/igdb-mapping";

describe('ValidationElementComponent', () => {
    let component: IgdbMappingGameCardComponent;
    let fixture: ComponentFixture<IgdbMappingGameCardComponent>;

    const mockInput = {
        psnGameId: 'game-123',
        psnGameName: 'Test Game',
        psnGameImageUrl: 'game.png',
        candidates: []
    } as IgdbMapping;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [IgdbMappingGameCardComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(IgdbMappingGameCardComponent);
        fixture.componentRef.setInput('igdbMapping', mockInput);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => expect(component).toBeTruthy());
});
