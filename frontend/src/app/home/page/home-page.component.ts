import {Component, inject, OnInit} from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {HomePlayerListComponent} from "../components/home-player-list/home-player-list.component";
import {HomeGamesComponent} from "../components/home-games/home-games.component";
import {BackgroundImageService} from "../../core/stores/background-image.service";
import {NavigatorService} from '../../core/services/navigator.service';
import {HomeDataService} from '../services/home-data.service';
import {SpinnerContainerComponent} from '../../core/components/spinner-container/spinner-container.component';


@Component({
  selector: 'tq-home-page',
  imports: [
    MatProgressSpinnerModule,
    HomePlayerListComponent,
    HomeGamesComponent,
    SpinnerContainerComponent,
  ],
  providers: [HomeDataService],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  private readonly dataService = inject(HomeDataService);
  private readonly backgroundImageService = inject(BackgroundImageService);
  private readonly navigatorService = inject(NavigatorService);

  readonly isLoading = this.dataService.isLoading;
  readonly isError = this.dataService.isError;
  readonly games = this.dataService.recentGames;
  readonly activePlayerTrophies = this.dataService.topActivePlayerTrophies;

  ngOnInit(): void {
    this.backgroundImageService.useTopPlayedGame();
    this.dataService.fetchData();
  }

  ngOnDestroy(): void {
    this.dataService.reset();
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
