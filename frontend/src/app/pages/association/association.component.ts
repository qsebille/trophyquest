import {Component, computed, inject} from '@angular/core';
import {AssociationStoreService} from './services/stores/association-store.service';
import {SuiteCardComponent} from './components/cards/suite/suite-card.component';
import {CandidateCardComponent} from './components/cards/candidate/candidate-card.component';

@Component({
  imports: [
    SuiteCardComponent,
    CandidateCardComponent
  ],
  templateUrl: './association.component.html',
  styleUrl: './association.component.scss',
})
export class AssociationComponent {
  private readonly store = inject(AssociationStoreService);

  readonly association = this.store.association;
  readonly pageNumber = this.store.page;
  readonly totalAssociations = this.store.total;

  readonly candidates = computed(() =>
    this.store.association()?.games.sort((a, b) => b.score - a.score) ?? []
  );

  private selectedGameId: number | null = null;

  ngOnInit(): void {
    this.store.init();
  }

  nextAssociation(): void {
    this.store.nextPage();
  }

  previousAssociation(): void {
    this.store.previousPage();
  }

  selectCandidate(gameId: number): void {
    console.log("Select", gameId);
    this.selectedGameId = gameId;
  }

  isSelected(gameId: number): boolean {
    return this.selectedGameId === gameId;
  }
}
