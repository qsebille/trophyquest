import {Component, inject, OnInit} from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {HomePlayerListComponent} from "../home-player-list/home-player-list.component";
import {HomeGamesComponent} from "../home-games/home-games.component";
import {BackgroundImageService} from "../../../core/stores/background-image.service";
import {HomeService} from '../../services/home.service';
import {NavigatorService} from '../../../core/services/navigator.service';


@Component({
  selector: 'tq-home-page',
  imports: [
    MatProgressSpinnerModule,
    HomePlayerListComponent,
    HomeGamesComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  private readonly homeService = inject(HomeService);
  private readonly backgroundImageService = inject(BackgroundImageService);
  private readonly navigatorService = inject(NavigatorService);

  readonly games = this.homeService.recentGames;
  readonly activePlayerTrophies = this.homeService.topActivePlayerTrophies;

  ngOnInit(): void {
    this.backgroundImageService.useTopPlayedGame();
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

  navigateToTrophySuitePage(data: { playerId: string, gameId: string, trophySuiteId: string }): void {
    this.navigatorService.goToTrophySuitePage(data.trophySuiteId, data.gameId, data.playerId);
  }
}
