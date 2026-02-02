import {Component, computed, input, output} from '@angular/core';
import {DatePipe} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from '@angular/material/tooltip';
import {ValidateCandidateStatus} from "../../../core/models/validate-candidate-status";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {IgdbCandidate} from "../../../core/api/dtos/candidate/igdb-candidate";
import {MatIconModule} from "@angular/material/icon";

@Component({
    selector: 'tq-igdb-mapping-candidate-card',
    imports: [
        DatePipe,
        MatButtonModule,
        MatTooltipModule,
        MatProgressSpinnerModule,
        MatIconModule,
    ],
    templateUrl: './igdb-mapping-candidate-card.component.html',
    styleUrl: './igdb-mapping-candidate-card.component.scss',
})
export class IgdbMappingCandidateCardComponent {
    readonly candidate = input.required<IgdbCandidate>();
    readonly validationStatus = input<ValidateCandidateStatus>(ValidateCandidateStatus.NONE);
    readonly candidateAccepted = output<number>();

    readonly isValidationDisabled = computed(() => this.validationStatus() === ValidateCandidateStatus.LOADING);

    readonly confidence = computed((): 'very-high' | 'high' | 'medium' | 'low' => {
        if (this.candidate().score === 100) {
            return "very-high"
        } else if (this.candidate().score >= 75) {
            return "high"
        } else if (this.candidate().score >= 50) {
            return "medium"
        } else {
            return "low"
        }
    });

    acceptCandidate(): void {
        this.candidateAccepted.emit(this.candidate().id);
    }
}
