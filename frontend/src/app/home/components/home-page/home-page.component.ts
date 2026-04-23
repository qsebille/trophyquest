import {Component, inject, OnInit} from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {HomePlayerListComponent} from "../home-player-list/home-player-list.component";
import {HomeStatsComponent} from "../home-stats/home-stats.component";
import {HomeGamesComponent} from "../home-games/home-games.component";
import {GameCoverStoreService} from "../../../core/stores/game-cover-store.service";
import {HomeService} from '../../services/home.service';
import {NavigatorService} from '../../../core/services/navigator.service';


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
  private readonly homeService = inject(HomeService);
  private readonly gameCoverStore = inject(GameCoverStoreService);
  private readonly navigatorService = inject(NavigatorService);

  readonly games = this.homeService.recentGames;
  readonly stats = this.homeService.stats;
  readonly players = this.homeService.topPlayers;

  ngOnInit(): void {
    this.gameCoverStore.refreshTopPlayedGame();
    this.homeService.fetchData();
  }

  ngOnDestroy(): void {
    this.homeService.reset();
  }

  navigateToGamePage(gameId: string): void {
    this.navigatorService.goToGamePage(gameId);
  }

  navigateToProfilePage(playerId: string): void {
    this.navigatorService.goToProfilePage(playerId);
  }

  navigateToTrophySuitePage(trophySuiteId: string, playerId: string): void {
    this.navigatorService.goToTrophySuitePage(trophySuiteId, playerId);
  }
}
