import {ComponentFixture, TestBed} from '@angular/core/testing';

import {IgdbMappingCandidateCardComponent} from './igdb-mapping-candidate-card.component';
import {signal} from "@angular/core";
import {IgdbCandidate} from "../../../core/api/dtos/candidate/igdb-candidate";

describe('IgdbMappingCandidateCardComponent', () => {
    let component: IgdbMappingCandidateCardComponent;
    let fixture: ComponentFixture<IgdbMappingCandidateCardComponent>;

    let mockCandidate = signal<IgdbCandidate>({
        id: 1,
        name: "Test Game",
        cover: "test.jpg",
    } as IgdbCandidate);

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [IgdbMappingCandidateCardComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(IgdbMappingCandidateCardComponent);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('candidate', mockCandidate());
        fixture.detectChanges();
    });

    it('should create', () => expect(component).toBeTruthy());

    it('should return the correct confidence level depending on score', () => {
        mockCandidate.update(c => ({...c, score: 100}));
        fixture.componentRef.setInput('candidate', mockCandidate());
        fixture.detectChanges();
        expect(component.confidence()).toEqual("very-high");

        mockCandidate.update(c => ({...c, score: 99}));
        fixture.componentRef.setInput('candidate', mockCandidate());
        fixture.detectChanges();
        expect(component.confidence()).toEqual("high");

        mockCandidate.update(c => ({...c, score: 75}));
        fixture.componentRef.setInput('candidate', mockCandidate());
        fixture.detectChanges();
        expect(component.confidence()).toEqual("high");

        mockCandidate.update(c => ({...c, score: 74}));
        fixture.componentRef.setInput('candidate', mockCandidate());
        fixture.detectChanges();
        expect(component.confidence()).toEqual("medium");

        mockCandidate.update(c => ({...c, score: 50}));
        fixture.componentRef.setInput('candidate', mockCandidate());
        fixture.detectChanges();
        expect(component.confidence()).toEqual("medium");

        mockCandidate.update(c => ({...c, score: 49}));
        fixture.componentRef.setInput('candidate', mockCandidate());
        fixture.detectChanges();
        expect(component.confidence()).toEqual("low");
    });
});
