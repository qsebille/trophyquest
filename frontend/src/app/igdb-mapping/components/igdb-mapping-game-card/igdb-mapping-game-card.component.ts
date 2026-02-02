import {Component, computed, input, output} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {IgdbMappingCandidateCardComponent} from "../igdb-mapping-candidate-card/igdb-mapping-candidate-card.component";
import {IgdbMapping} from "../../../core/api/dtos/candidate/igdb-mapping";
import {ValidateCandidateStatus} from "../../../core/models/validate-candidate-status";

@Component({
    selector: 'tq-igdb-mapping-game-card',
    imports: [
        MatButtonModule,
        MatProgressSpinnerModule,
        IgdbMappingCandidateCardComponent,
    ],
    templateUrl: './igdb-mapping-game-card.component.html',
    styleUrl: './igdb-mapping-game-card.component.scss',
})
export class IgdbMappingGameCardComponent {
    readonly igdbMapping = input.required<IgdbMapping>();
    readonly validationStatus = input<ValidateCandidateStatus>(ValidateCandidateStatus.NONE);
    readonly candidateAccepted = output<number>();
    readonly allRejected = output<void>();

    private readonly _candidates = computed(() => this.igdbMapping().candidates ?? []);
    readonly sortedCandidates = computed(() => this._candidates().sort((a, b) => b.score - a.score));

    readonly isRejectButtonDisabled = computed(() => this.validationStatus() === ValidateCandidateStatus.LOADING);

    acceptCandidate(candidateId: number): void {
        this.candidateAccepted.emit(candidateId);
    }

    rejectMapping(): void {
        this.allRejected.emit();
    }
}
