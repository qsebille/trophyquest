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
  readonly playersPagination = input.required<Pagination<GamePlayer> | null>();
  readonly pageChange = output<number>();
  readonly selectPlayer = output<string>();
  readonly pseudoClicked = output<string>();

  readonly content = computed(() => this.playersPagination()?.content ?? []);
  readonly page = signal(1);
  readonly total = computed(() => this.playersPagination()?.total ?? 0);
  readonly size = computed(() => this.playersPagination()?.size ?? 0);
  readonly hasMultiplePages = computed(() => this.total() > this.size());

  constructor() {
    effect(() => {
      const backendPage = this.playersPagination()?.page ?? 0;
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
