import {computed, Injectable, signal} from '@angular/core';
import {LoadingStatus} from "../../core/models/loading-status.enum";
import {PlayerApiService} from "../../core/api/services/player-api.service";
import {TrophyApiService} from "../../core/api/services/trophy-api.service";
import {forkJoin} from "rxjs";
import {GameApiService} from "../../core/api/services/game-api.service";

@Injectable({
    providedIn: 'root',
})
export class HomeStatsStore {
    private readonly _playerCount = signal<number>(0);
    private readonly _recentPlayerCount = signal<number>(0);
    private readonly _gameCount = signal<number>(0);
    private readonly _recentGameCount = signal<number>(0);
    private readonly _trophyCount = signal<number>(0);
    private readonly _recentTrophyCount = signal<number>(0);
    private readonly _status = signal<LoadingStatus>(LoadingStatus.NONE);

    readonly playerCount = computed(() => this._playerCount());
    readonly recentPlayerCount = computed(() => this._recentPlayerCount());
    readonly gameCount = computed(() => this._gameCount());
    readonly recentGameCount = computed(() => this._recentGameCount());
    readonly trophyCount = computed(() => this._trophyCount());
    readonly recentTrophyCount = computed(() => this._recentTrophyCount());
    readonly status = computed(() => this._status());

    constructor(
        private readonly _playerService: PlayerApiService,
        private readonly _gameService: GameApiService,
        private readonly _trophyService: TrophyApiService,
    ) {
    }

    fetch(): void {
        this._status.set(LoadingStatus.LOADING);

        forkJoin({
            playerCount: this._playerService.count(),
            gameCount: this._gameService.count(),
            trophyCount: this._trophyService.count(),
            recentPlayerCount: this._playerService.countRecent(),
            recentGameCount: this._gameService.countRecent(),
            recentTrophyCount: this._trophyService.countRecentlyEarned(),
        }).subscribe({
            next: ({
                       playerCount,
                       gameCount,
                       trophyCount,
                       recentPlayerCount,
                       recentGameCount,
                       recentTrophyCount
                   }) => {
                this._playerCount.set(playerCount);
                this._gameCount.set(gameCount);
                this._trophyCount.set(trophyCount);
                this._recentPlayerCount.set(recentPlayerCount);
                this._recentGameCount.set(recentGameCount);
                this._recentTrophyCount.set(recentTrophyCount);
                this._status.set(LoadingStatus.FULLY_LOADED);
            },
            error: error => {
                console.error('Failed to load stats', error);
                this._status.set(LoadingStatus.ERROR);
            }
        })
    }
}
