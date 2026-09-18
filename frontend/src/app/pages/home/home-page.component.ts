import {Component, inject, OnInit} from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {HomePlayerListComponent} from "./components/players/list/home-player-list.component";
import {HomeGameListComponent} from "./components/games/list/home-game-list.component";
import {BackgroundImageService} from "../../core/stores/background-image.service";
import {NavigatorService} from '../../core/services/navigator.service';
import {SpinnerContainerComponent} from '../../core/components/spinner-container/spinner-container.component';
import {HomeGameStoreService} from './services/stores/home-game-store.service';
import {HomePlayerStoreService} from './services/stores/home-player-store.service';
import {ErrorMessageComponent} from '../../utils/error-message/error-message.component';


@Component({
  imports: [
    MatProgressSpinnerModule,
    HomePlayerListComponent,
    HomeGameListComponent,
    SpinnerContainerComponent,
    ErrorMessageComponent,
  ],
  providers: [
    HomeGameStoreService,
    HomePlayerStoreService,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  private readonly playerStore = inject(HomePlayerStoreService);
  private readonly gameStore = inject(HomeGameStoreService);
  private readonly backgroundImageService = inject(BackgroundImageService);
  private readonly navigatorService = inject(NavigatorService);

  readonly games = this.gameStore.games;
  readonly isLoadingGames = this.gameStore.isLoading;
  readonly hasGamesError = this.gameStore.hasError;

  readonly players = this.playerStore.players;
  readonly isLoadingPlayers = this.playerStore.isLoading;
  readonly hasPlayersError = this.playerStore.hasError;

  ngOnInit(): void {
    this.backgroundImageService.useTopPlayedGame();
    this.playerStore.fetch();
    this.gameStore.fetch();
  }

  ngOnDestroy(): void {
    this.playerStore.reset();
    this.gameStore.reset();
  }

  navigateToGamePage(gameId: string): void {
    this.navigatorService.goToGamePage(gameId);
  }

  navigateToProfilePage(playerId: string): void {
    this.navigatorService.goToProfilePage(playerId);
  }

  navigateToTrophySuitePage(data: { playerId: string, gameId: string, suiteId: string }): void {
    this.navigatorService.goToTrophySuitePage(data.suiteId, data.gameId, data.playerId);
  }
}
