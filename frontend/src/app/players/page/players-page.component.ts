import {Component, inject, OnInit} from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {NavigatorService} from "../../core/services/navigator.service";
import {AddPlayerFormComponent} from "../components/add-player-form/add-player-form.component";
import {PlayerListComponent} from "../components/player-list/player-list.component";
import {BackgroundImageService} from "../../core/stores/background-image.service";
import {PlayersAddService} from '../services/players-add.service';
import {SpinnerContainerComponent} from '../../core/components/spinner-container/spinner-container.component';
import {PlayersDataService} from '../services/players-data.service';

@Component({
  imports: [
    MatProgressSpinnerModule,
    AddPlayerFormComponent,
    PlayerListComponent,
    SpinnerContainerComponent,
  ],
  providers: [
    PlayersDataService,
    PlayersAddService,
  ],
  templateUrl: './players-page.component.html',
  styleUrl: './players-page.component.scss',
})
export class PlayersPageComponent implements OnInit {
  private readonly playersDataService = inject(PlayersDataService);
  private readonly playersAddService = inject(PlayersAddService);
  private readonly navigator = inject(NavigatorService);
  private readonly backgroundImageService = inject(BackgroundImageService);

  readonly paginatedPlayers = this.playersDataService.pagination;
  readonly isLoadingPlayerList = this.playersDataService.isLoading;
  readonly listLoadingError = this.playersDataService.isError;
  readonly isLoadingAddPlayerForm = this.playersAddService.isLoading;

  ngOnInit(): void {
    this.playersDataService.init();
    this.backgroundImageService.useTopPlayedGame();
  }

  ngOnDestroy(): void {
    this.playersDataService.reset();
  }

  loadPageOfPlayers(page: number): void {
    this.playersDataService.search(page);
  }

  addPlayer(pseudo: string): void {
    this.playersAddService.addPlayer(pseudo);
  }

  goToProfilePage(playerId: string): void {
    this.navigator.goToProfilePage(playerId);
  }
}
