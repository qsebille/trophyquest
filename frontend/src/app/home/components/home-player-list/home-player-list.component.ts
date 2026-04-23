import {Component, computed, input, output} from '@angular/core';
import {TopRecentPlayerRow} from "../../../core/api/dtos/player/top-recent-player-row";
import {HomePlayerCardComponent} from "../home-player-card/home-player-card.component";
import {HomeTrophyCardComponent} from "../home-trophy-card/home-trophy-card.component";

@Component({
  selector: 'tq-home-player-list',
  imports: [
    HomePlayerCardComponent,
    HomeTrophyCardComponent,
  ],
  templateUrl: './home-player-list.component.html',
  styleUrl: './home-player-list.component.scss',
})
export class HomePlayerListComponent {
  readonly players = input<TopRecentPlayerRow[]>([]);

  readonly clickOnPlayer = output<string>();
  readonly clickOnGame = output<{ trophySuiteId: string, playerId: string }>();

  readonly hasNoRecentPlayers = computed(() => this.players().length == 0);
}
