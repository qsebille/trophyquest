import {Component, computed, OnInit} from '@angular/core';
import {PlayerListStore} from '../../stores/player-list-store';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {NavigatorService} from "../../../core/services/navigator.service";
import {AddPlayerFormComponent} from "../add-player-form/add-player-form.component";
import {PlayerListComponent} from "../player-list/player-list.component";

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

    constructor(
        private readonly _navigator: NavigatorService,
        private readonly _playerListStore: PlayerListStore,
    ) {
    }

    readonly players = computed(() => this._playerListStore.results());
    readonly totalPlayers = computed(() => this._playerListStore.total());
    readonly playerListStatus = computed(() => this._playerListStore.status());
    readonly addPlayerStatus = computed(() => this._playerListStore.addStatus());

    ngOnInit(): void {
        this.retrievePlayers();
    }

    retrievePlayers(): void {
        this._playerListStore.resetSearch();
        this._playerListStore.search();
    }

    loadMorePlayers(): void {
        this._playerListStore.loadMore();
    }

    navigateToProfilePage(playerId: string): void {
        this._navigator.goToProfilePage(playerId);
    }

    navigateToPlayerTrophySuitePage(trophySuite: string, playerId: string): void {
        this._navigator.goToPlayerTrophySuitePage(trophySuite, playerId);
    }

    addPlayer(pseudo: string): void {
        this._playerListStore.addPlayer(pseudo);
    }

    resetAddPlayerForm(): void {
        this._playerListStore.resetAddPlayerStatus();
    }

}
