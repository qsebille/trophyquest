import {Component, inject, OnInit} from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {NavigatorService} from "../../../core/services/navigator.service";
import {HomePlayerListComponent} from "../home-player-list/home-player-list.component";
import {HomeStatsStore} from "../../stores/home-stats-store.service";
import {HomeStatsComponent} from "../home-stats/home-stats.component";
import {HomeRecentPlayersStore} from "../../stores/home-recent-players-store.service";
import {HomeRecentGamesStore} from "../../stores/home-recent-games-store.service";
import {HomeGamesComponent} from "../home-games/home-games.component";
import {GameCoverStoreService} from "../../../core/stores/game-cover-store.service";


@Component({
  selector: 'tq-home-page',
  imports: [
    MatProgressSpinnerModule,
    HomePlayerListComponent,
    HomeStatsComponent,
    HomeStatsComponent,
    HomeGamesComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  private readonly statsStore = inject(HomeStatsStore);
  private readonly recentPlayersStore = inject(HomeRecentPlayersStore);
  private readonly recentGamesStore = inject(HomeRecentGamesStore);
  private readonly gameCoverStore = inject(GameCoverStoreService);

  readonly navigator = inject(NavigatorService);
  readonly games = this.recentGamesStore.recentGames;
  readonly stats = this.statsStore.data;
  readonly statsLoadingStatus = this.statsStore.status;
  readonly gamesStatus = this.recentGamesStore.status;
  readonly gamesTotal = this.recentGamesStore.total;
  readonly players = this.recentPlayersStore.players;
  readonly playersStatus = this.recentPlayersStore.status;

  ngOnInit(): void {
    this.statsStore.fetch();
    this.recentPlayersStore.fetch();
    this.recentGamesStore.fetch();
    this.gameCoverStore.refreshTopPlayedGame();
  }
}
