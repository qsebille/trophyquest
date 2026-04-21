import {Component, computed, input, output} from '@angular/core';
import {GameSearchItem} from '../../../core/api/dtos/game/game-search-item';
import {GameSearchItemComponent} from '../game-search-item/game-search-item.component';

@Component({
  selector: 'tq-game-search-list',
  imports: [
    GameSearchItemComponent
  ],
  templateUrl: './game-search-list.component.html',
  styleUrl: './game-search-list.component.scss',
})
export class GameSearchListComponent {
  readonly games = input.required<GameSearchItem[]>();
  readonly totalGames = input.required<number>();
  readonly loadMore = output<void>();
  readonly searchTermChanged = output<string>();

  readonly hasMoreGamesToLoad = computed(() => this.totalGames() > this.games().length);
}
