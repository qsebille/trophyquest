import {Component, inject, OnInit} from '@angular/core';
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
  readonly store: IgdbMappingStoreService = inject(IgdbMappingStoreService);

  ngOnInit(): void {
    this.store.search();
  }

  ngOnDestroy(): void {
    this.store.reset();
  }
}
