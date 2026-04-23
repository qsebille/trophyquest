import {Component, computed, input, output} from '@angular/core';
import {PlayerCardComponent} from "../player-card/player-card.component";
import {PlayerSearchItem} from "../../../core/api/dtos/player/player-search-item";
import {Pagination} from '../../../core/api/dtos/pagination';
import {NgbPagination} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'tq-player-list',
  imports: [
    PlayerCardComponent,
    NgbPagination
  ],
  templateUrl: './player-list.component.html',
  styleUrl: './player-list.component.scss',
})
export class PlayerListComponent {
  readonly paginatedPlayers = input.required<Pagination<PlayerSearchItem>>();

  readonly onClickOnPlayer = output<string>();
  readonly onPageChange = output<number>();

  changePage(page: number): void {
    if (page !== this.page()) {
      this.onPageChange.emit(page - 1);
    }
  }

  readonly players = computed(() => this.paginatedPlayers()?.content);
  readonly collectionSize = computed(() => this.paginatedPlayers()?.total);
  readonly pageSize = computed(() => this.paginatedPlayers()?.size);
  readonly page = computed(() => this.paginatedPlayers()?.page + 1);
  readonly isEmpty = computed(() => this.players().length === 0);
  readonly hasOnePage = computed(() => this.collectionSize() <= this.pageSize());
}
