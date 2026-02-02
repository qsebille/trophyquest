import {Component, computed, input, output} from '@angular/core';
import {LoadingStatus} from "../../../core/models/loading-status.enum";
import {ErrorMessageComponent} from "../../../core/components/error-message/error-message.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {IgdbMappingGameCardComponent} from "../igdb-mapping-game-card/igdb-mapping-game-card.component";
import {IgdbMapping} from "../../../core/api/dtos/candidate/igdb-mapping";
import {ValidateCandidateStatus} from "../../../core/models/validate-candidate-status";
import {SpinnerContainerComponent} from "../../../core/components/spinner-container/spinner-container.component";

@Component({
    selector: 'tq-igdb-mapping-list',
    imports: [
        ErrorMessageComponent,
        MatProgressSpinnerModule,
        IgdbMappingGameCardComponent,
        SpinnerContainerComponent,
    ],
    templateUrl: './igdb-mapping-list.component.html',
    styleUrl: './igdb-mapping-list.component.scss',
})
export class IgdbMappingListComponent {
    readonly mappingList = input<IgdbMapping[]>([]);
    readonly status = input<LoadingStatus>(LoadingStatus.NONE);
    readonly validationStatus = input<ValidateCandidateStatus>(ValidateCandidateStatus.NONE);
    readonly candidateAccepted = output<{ gameId: string, candidateId: number }>();
    readonly rejectCandidates = output<{ gameId: string }>();

    isLoading = computed(() => this.status() === LoadingStatus.LOADING);
    hasFailed = computed(() => this.status() === LoadingStatus.ERROR);
    hasNoResults = computed(() => this.mappingList().length === 0);

    acceptCandidate(gameId: string, candidateId: number): void {
        this.candidateAccepted.emit({gameId: gameId, candidateId});
    }

    rejectAllCandidates(gameId: string): void {
        this.rejectCandidates.emit({gameId: gameId});
    }
}
