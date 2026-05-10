import {Component, computed, input, output} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {IgdbMappingCandidateCardComponent} from "../igdb-mapping-candidate-card/igdb-mapping-candidate-card.component";
import {IgdbMapping} from "../../../core/api/dtos/igdb/igdb-mapping";

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
  readonly isLoadingValidation = input<boolean>(false);
  readonly candidateAccepted = output<number>();
  readonly allRejected = output<void>();

  private readonly candidates = computed(() => this.igdbMapping().candidates ?? []);
  readonly sortedCandidates = computed(() => this.candidates().sort((a, b) => b.score - a.score));
}
