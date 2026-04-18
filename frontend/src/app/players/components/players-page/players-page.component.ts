import {Component, inject, OnInit} from '@angular/core';
import {PlayerListStore} from '../../stores/player-list-store';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {NavigatorService} from "../../../core/services/navigator.service";
import {AddPlayerFormComponent} from "../add-player-form/add-player-form.component";
import {PlayerListComponent} from "../player-list/player-list.component";
import {GameCoverStoreService} from "../../../core/stores/game-cover-store.service";

@Component({
  imports: [
    MatProgressSpinnerModule,
    AddPlayerFormComponent,
    PlayerListComponent,
  ],
  templateUrl: './players-page.component.html',
  styleUrl: './players-page.component.scss',
})
export class PlayersPageComponent implements OnInit {
  readonly navigator: NavigatorService = inject(NavigatorService);
  readonly playerListStore: PlayerListStore = inject(PlayerListStore);
  readonly gameCoverStoreService: GameCoverStoreService = inject(GameCoverStoreService);

  ngOnInit(): void {
    this.retrievePlayers();
    this.gameCoverStoreService.refreshTopPlayedGame();
  }

  retrievePlayers(): void {
    this.playerListStore.resetSearch();
    this.playerListStore.search();
  }
}
