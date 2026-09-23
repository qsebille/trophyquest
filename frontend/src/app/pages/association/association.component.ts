import {Component, computed, inject} from '@angular/core';
import {AssociationStoreService} from './services/stores/association-store.service';
import {SuiteCardComponent} from './components/cards/suite/suite-card.component';
import {CandidateCardComponent} from './components/cards/candidate/candidate-card.component';
import {AssociationValidationService} from './services/association-validation.service';
import {SpinnerContainerComponent} from '../../core/components/spinner-container/spinner-container.component';

@Component({
  imports: [
    SuiteCardComponent,
    CandidateCardComponent,
    SpinnerContainerComponent
  ],
  templateUrl: './association.component.html',
  styleUrl: './association.component.scss',
})
export class AssociationComponent {
  private readonly store = inject(AssociationStoreService);
  private readonly validationService = inject(AssociationValidationService);

  readonly association = this.store.association;
  readonly pageNumber = this.store.page;
  readonly totalAssociations = this.store.total;
  readonly isLoadingValidation = this.validationService.isLoading;

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
    if (this.selectedGameId === gameId) {
      this.selectedGameId = null;
      return;
    }
    this.selectedGameId = gameId;
  }

  isSelected(gameId: number): boolean {
    return this.selectedGameId === gameId;
  }

  hasSelectedCandidate(): boolean {
    return this.selectedGameId !== null;
  }

  validateAssociation(): void {
    const suiteId = this.association()?.suite?.suiteId;
    if (this.selectedGameId === null || !suiteId) return;
    this.validationService.validateAssociation$(suiteId, this.selectedGameId).subscribe(
      value => {
        if (value) {
          this.store.init();
        }
      }
    );
  }

  rejectAllCandidates(): void {
    const suiteId = this.association()?.suite?.suiteId;
    if (!suiteId) return;
    this.validationService.rejectAllCandidates$(suiteId).subscribe(
      value => {
        if (value) {
          this.store.init();
        }
      }
    );
  }
}
