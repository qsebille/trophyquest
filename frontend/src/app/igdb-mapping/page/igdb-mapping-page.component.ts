import {Component, computed, inject, OnInit} from '@angular/core';
import {BlockComponent} from "../../core/components/trophyquest-block/block.component";
import {BlockContentTemplate, BlockHeaderTemplate} from "../../core/templates/block.template";
import {IgdbMappingListComponent} from "../components/igdb-mapping-list/igdb-mapping-list.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {IgdbMappingDataService} from '../services/igdb-mapping-data.service';
import {IgdbMappingValidationService} from '../services/igdb-mapping-validation.service';
import {catchError, EMPTY, exhaustMap, Subject, switchMap} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  imports: [
    BlockComponent,
    BlockContentTemplate,
    BlockHeaderTemplate,
    IgdbMappingListComponent,
    MatProgressSpinnerModule,
  ],
  providers: [
    IgdbMappingDataService,
    IgdbMappingValidationService,
  ],
  templateUrl: './igdb-mapping-page.component.html',
  styleUrl: './igdb-mapping-page.component.scss',
})
export class IgdbMappingPage implements OnInit {
  private readonly dataService = inject(IgdbMappingDataService);
  private readonly validationService = inject(IgdbMappingValidationService);

  private readonly actionSubject = new Subject<MappingValidationAction>();

  readonly mappingList = this.dataService.mappingList;
  readonly showLoadMoreButton = computed(() => this.mappingList().length < this.dataService.total());
  readonly hasErrorLoadingMappings = this.dataService.isError;
  readonly isLoadingMappings = this.dataService.isLoading;
  readonly isLoadingValidation = this.validationService.isLoading;

  constructor() {
    this.actionSubject
      .pipe(
        exhaustMap(data => {
          const validation$ = data.type === 'validate' ?
            this.validationService.validateCandidate$(data.gameId, data.candidateId) :
            this.validationService.rejectCandidates$(data.gameId);

          return validation$
            .pipe(
              switchMap(() => this.dataService.refresh$()),
              catchError(err => {
                console.error('Failed to validate player', err);
                return EMPTY;
              })
            )
        }),
        takeUntilDestroyed(),
      ).subscribe();
  }

  ngOnInit(): void {
    this.dataService.init();
  }

  ngOnDestroy(): void {
    this.dataService.reset();
  }

  rejectCandidates(gameId: string): void {
    this.actionSubject.next({type: 'reject', gameId});
  }

  validateCandidate(gameId: string, candidateId: number): void {
    this.actionSubject.next({type: 'validate', gameId, candidateId});
  }

  loadMore(): void {
    this.dataService.loadMore();
  }
}

type MappingValidationAction = { type: 'validate', gameId: string, candidateId: number } | {
  type: 'reject',
  gameId: string
};
