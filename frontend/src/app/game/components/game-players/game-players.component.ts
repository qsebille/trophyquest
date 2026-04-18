import {Component, computed, effect, input, output, signal} from '@angular/core';
import {DatePipe, NgOptimizedImage} from '@angular/common';
import {NgbPagination} from '@ng-bootstrap/ng-bootstrap';

import {GamePlayer} from '../../../core/api/dtos/player/game-player';
import {Pagination} from '../../../core/api/dtos/pagination';

@Component({
  selector: 'tq-game-players',
  imports: [
    NgbPagination,
    NgOptimizedImage,
    DatePipe
  ],
  templateUrl: './game-players.component.html',
  styleUrl: './game-players.component.scss',
})
export class GamePlayersComponent {
  readonly playersPagination = input.required<Pagination<GamePlayer>>();
  readonly pageChange = output<number>();
  readonly selectPlayer = output<string>();
  readonly pseudoClicked = output<string>();

  readonly page = signal(1);
  readonly collectionSize = computed(() => this.playersPagination()?.total ?? 0);
  readonly pageSize = computed(() => this.playersPagination()?.pageSize ?? 0);

  constructor() {
    effect(() => {
      const backendPage = this.playersPagination()?.currentPage ?? 0;
      const uiPage = backendPage + 1;

      if (this.page() !== uiPage) {
        this.page.set(uiPage);
      }
    });
  }

  onPlayerPageChange(page: number): void {
    this.page.set(page);
    this.pageChange.emit(page - 1);
  }
}
