import {Component, computed, OnInit} from '@angular/core';
import {BlockComponent} from "../../../core/components/trophyquest-block/block.component";
import {BlockContentTemplate, BlockHeaderTemplate} from "../../../core/templates/block.template";
import {IgdbMappingListComponent} from "../igdb-mapping-list/igdb-mapping-list.component";
import {IgdbMappingStoreService} from "../../stores/igdb-mapping-store.service";
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
    constructor(private readonly _igdbMappingStore: IgdbMappingStoreService) {
    }

    mappingList = computed(() => this._igdbMappingStore.mappingList());
    searchStatus = computed(() => this._igdbMappingStore.status());
    validationStatus = computed(() => this._igdbMappingStore.validationStatus())

    ngOnInit(): void {
        this._igdbMappingStore.reset();
        this._igdbMappingStore.search();
    }

    loadMore(): void {
        this._igdbMappingStore.loadMore();
    }

    acceptMapping(event: { gameId: string, candidateId: number }): void {
        this._igdbMappingStore.validateCandidate(event.gameId, event.candidateId);
    }

    rejectCandidates(event: { gameId: string }): void {
        this._igdbMappingStore.rejectCandidates(event.gameId);
    }
}
