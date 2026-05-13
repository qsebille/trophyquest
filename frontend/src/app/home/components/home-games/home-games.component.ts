import {Component, computed, input, output} from '@angular/core';
import {RecentGame} from "../../../core/api/dtos/game/recent-game";
import {HomeGameCardComponent} from "../home-game-card/home-game-card.component";

@Component({
  selector: 'tq-home-games',
  imports: [
    HomeGameCardComponent,
  ],
  templateUrl: './home-games.component.html',
  styleUrl: './home-games.component.scss',
})
export class HomeGamesComponent {
  readonly games = input<RecentGame[]>([]);
  readonly clickOnGame = output<string>();

  readonly hasNoRecentGames = computed(() => this.games().length === 0);
}
