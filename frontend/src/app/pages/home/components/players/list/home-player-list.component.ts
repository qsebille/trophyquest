import {Component, computed, input, output} from '@angular/core';
import {HomePlayerCardComponent} from '../card/home-player-card.component';
import {HomePlayerItem} from '../../../models/home-player-item';

@Component({
  selector: 'tq-home-player-list',
  imports: [
    HomePlayerCardComponent,
  ],
  templateUrl: './home-player-list.component.html',
  styleUrl: './home-player-list.component.scss',
})
export class HomePlayerListComponent {
  readonly players = input<HomePlayerItem[]>([]);

  readonly clickOnPlayer = output<string>();
  readonly clickOnGame = output<{ playerId: string, gameId: string, trophySuiteId: string }>();

  readonly noRecentPlayers = computed(() => this.players().length == 0);
}
