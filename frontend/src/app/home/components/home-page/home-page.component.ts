import {Component, computed, OnInit} from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {NavigatorService} from "../../../core/services/navigator.service";
import {HomePlayerListComponent} from "../home-player-list/home-player-list.component";
import {HomeStatsStore} from "../../stores/home-stats-store.service";
import {HomeStats} from "../../../core/models/dto/home-stats";
import {HomeStatsComponent} from "../home-stats/home-stats.component";
import {HomeRecentPlayersStore} from "../../stores/home-recent-players-store.service";
import {HomeRecentGamesStore} from "../../stores/home-recent-games-store.service";
import {HomeGamesComponent} from "../home-games/home-games.component";


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
    constructor(
        private readonly _statsStore: HomeStatsStore,
        private readonly _recentPlayersStore: HomeRecentPlayersStore,
        private readonly _recentGamesStore: HomeRecentGamesStore,
        private readonly _navigator: NavigatorService,
    ) {
    }

    readonly stats = computed(() =>
        ({
            totalPlayers: this._statsStore.playerCount(),
            totalGames: this._statsStore.gameCount(),
            totalTrophies: this._statsStore.trophyCount(),
            recentPlayers: this._statsStore.recentPlayerCount(),
            recentGames: this._statsStore.recentGameCount(),
            recentTrophies: this._statsStore.recentTrophyCount(),
        } as HomeStats));
    readonly statsLoadingStatus = computed(() => this._statsStore.status());

    readonly games = computed(() => this._recentGamesStore.recentGames());
    readonly gamesStatus = computed(() => this._recentGamesStore.status());
    readonly gamesTotal = computed(() => this._recentGamesStore.total());

    readonly players = computed(() => this._recentPlayersStore.players());
    readonly playersStatus = computed(() => this._recentPlayersStore.status());

    ngOnInit(): void {
        this._statsStore.fetch();
        this._recentPlayersStore.reset();
        this._recentPlayersStore.fetch();
        this._recentGamesStore.reset();
        this._recentGamesStore.fetch();
    }

    navigateToPlayersPage(): void {
        this._navigator.goToPlayersPage();
    }

    navigateToProfilePage(playerId: string): void {
        this._navigator.goToProfilePage(playerId);
    }

    navigateToTrophySuitePage(trophySuiteId: string): void {
        this._navigator.goToTrophySuitePage(trophySuiteId);
    }

    navigateToPlayerTrophySuitePage(trophySuiteId: string, playerId: string): void {
        this._navigator.goToPlayerTrophySuitePage(trophySuiteId, playerId);
    }
}
