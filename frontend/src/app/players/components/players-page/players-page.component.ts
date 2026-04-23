import {Component, inject, OnInit} from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {NavigatorService} from "../../../core/services/navigator.service";
import {AddPlayerFormComponent} from "../add-player-form/add-player-form.component";
import {PlayerListComponent} from "../player-list/player-list.component";
import {GameCoverStoreService} from "../../../core/stores/game-cover-store.service";
import {PlayersService} from '../../services/players.service';
import {PlayersAddService} from '../../services/players-add.service';
import {SpinnerContainerComponent} from '../../../core/components/spinner-container/spinner-container.component';

@Component({
  imports: [
    MatProgressSpinnerModule,
    AddPlayerFormComponent,
    PlayerListComponent,
    SpinnerContainerComponent,
  ],
  templateUrl: './players-page.component.html',
  styleUrl: './players-page.component.scss',
})
export class PlayersPageComponent implements OnInit {
  private readonly playersService = inject(PlayersService);
  private readonly playersAddService = inject(PlayersAddService);
  private readonly navigator: NavigatorService = inject(NavigatorService);
  private readonly gameCoverStoreService: GameCoverStoreService = inject(GameCoverStoreService);

  readonly paginatedPlayers = this.playersService.pagination;
  readonly isLoadingPlayerList = this.playersService.isLoading;
  readonly isLoadingAddPlayerForm = this.playersAddService.isLoading;

  ngOnInit(): void {
    this.loadPageOfPlayers(0);
    this.gameCoverStoreService.refreshTopPlayedGame();
  }

  ngOnDestroy(): void {
    this.playersService.reset();
  }

  loadPageOfPlayers(page: number): void {
    this.playersService.search(page);
  }

  addPlayer(pseudo: string): void {
    this.playersAddService.addPlayer(pseudo);
  }

  goToProfilePage(playerId: string): void {
    this.navigator.goToProfilePage(playerId);
  }
}
