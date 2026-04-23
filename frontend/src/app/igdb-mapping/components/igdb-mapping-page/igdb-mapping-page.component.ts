import {Component, computed, inject, OnInit} from '@angular/core';
import {BlockComponent} from "../../../core/components/trophyquest-block/block.component";
import {BlockContentTemplate, BlockHeaderTemplate} from "../../../core/templates/block.template";
import {IgdbMappingListComponent} from "../igdb-mapping-list/igdb-mapping-list.component";
import {IgdbMappingService} from "../../services/igdb-mapping.service";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@Component({
  imports: [
    BlockComponent,
    BlockContentTemplate,
    BlockHeaderTemplate,
    IgdbMappingListComponent,
    MatProgressSpinnerModule,
  ],
  templateUrl: './igdb-mapping-page.component.html',
  styleUrl: './igdb-mapping-page.component.scss',
})
export class IgdbMappingPage implements OnInit {
  private readonly igdbMappingService = inject(IgdbMappingService);

  readonly mappingList = this.igdbMappingService.mappingList;
  readonly showLoadMoreButton = computed(() => this.mappingList().length < this.igdbMappingService.total());
  readonly isLoading = this.igdbMappingService.isLoading;
  readonly validationStatus = this.igdbMappingService.validationStatus;

  ngOnInit(): void {
    this.igdbMappingService.search();
  }

  ngOnDestroy(): void {
    this.igdbMappingService.reset();
  }

  rejectCandidates(gameId: string): void {
    this.igdbMappingService.rejectCandidates(gameId);
  }

  validateCandidate(gameId: string, candidateId: number): void {
    this.igdbMappingService.validateCandidate(gameId, candidateId);
  }

  loadMore(): void {
    this.igdbMappingService.loadMore();
  }
}
