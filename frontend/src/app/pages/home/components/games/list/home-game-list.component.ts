import {Component, computed, input, output} from '@angular/core';
import {HomeGameCardComponent} from "../card/home-game-card.component";
import {HomeGameItem} from '../../../models/home-game-item';

@Component({
  selector: 'tq-home-game-list',
  imports: [
    HomeGameCardComponent,
  ],
  templateUrl: './home-game-list.component.html',
  styleUrl: './home-game-list.component.scss',
})
export class HomeGameListComponent {
  readonly games = input<HomeGameItem[]>([]);
  readonly clickOnGame = output<string>();

  readonly hasNoRecentGames = computed(() => this.games().length === 0);
}
