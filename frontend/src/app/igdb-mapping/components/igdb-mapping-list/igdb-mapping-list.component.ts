import {Component, computed, input, output} from '@angular/core';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {IgdbMappingGameCardComponent} from "../igdb-mapping-game-card/igdb-mapping-game-card.component";
import {IgdbMapping} from "../../../core/api/dtos/igdb/igdb-mapping";
import {SpinnerContainerComponent} from '../../../core/components/spinner-container/spinner-container.component';

@Component({
  selector: 'tq-igdb-mapping-list',
  imports: [
    MatProgressSpinnerModule,
    IgdbMappingGameCardComponent,
    SpinnerContainerComponent,
  ],
  templateUrl: './igdb-mapping-list.component.html',
  styleUrl: './igdb-mapping-list.component.scss',
})
export class IgdbMappingListComponent {
  readonly mappingList = input<IgdbMapping[]>([]);
  readonly isLoading = input<boolean>(false);
  readonly isLoadingValidation = input<boolean>(false);
  readonly candidateAccepted = output<{ gameId: string, candidateId: number }>();
  readonly rejectCandidates = output<{ gameId: string }>();

  readonly hasNoResults = computed(() => this.mappingList().length === 0 && !this.isLoading());

  acceptCandidate(gameId: string, candidateId: number): void {
    this.candidateAccepted.emit({gameId: gameId, candidateId});
  }

  rejectAllCandidates(gameId: string): void {
    this.rejectCandidates.emit({gameId: gameId});
  }
}
