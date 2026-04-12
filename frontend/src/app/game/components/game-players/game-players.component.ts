import {Component, computed, input, output} from '@angular/core';
import {GamePlayer} from '../../../core/api/dtos/player/game-player';
import {Pagination} from '../../../core/api/dtos/pagination';
import {DatePipe, NgOptimizedImage} from '@angular/common';
import {NgbPagination} from '@ng-bootstrap/ng-bootstrap';

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

  page = computed(() => this.playersPagination()?.currentPage ?? 0)
  collectionSize = computed(() => this.playersPagination()?.total ?? 0)
  pageSize = computed(() => this.playersPagination()?.pageSize ?? 0)

  onPlayerPageChange(page: number) {
    console.log('page change', page);
    this.pageChange.emit(page - 1);
  }

  onSelectPlayer(player: GamePlayer) {
    this.selectPlayer.emit(player.id);
  }

  onClickPseudo(player: GamePlayer) {
    this.pseudoClicked.emit(player.id);
  }
}
