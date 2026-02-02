import {computed, Injectable, signal} from '@angular/core';
import {EMPTY_PLAYER, Player} from "../../core/api/dtos/player/player";
import {LoadingStatus} from "../../core/models/loading-status.enum";
import {forkJoin} from "rxjs";
import {PlayerApiService} from "../../core/api/services/player-api.service";
import {EMPTY_PLAYER_STATS, PlayerStats} from "../../core/api/dtos/player/player-stats";

@Injectable({
    providedIn: 'root',
})
export class ProfileSummaryStore {
    private _player = signal<Player>(EMPTY_PLAYER);
    private _playerStats = signal<PlayerStats>(EMPTY_PLAYER_STATS);
    private _status = signal<LoadingStatus>(LoadingStatus.NONE);

    readonly player = computed(() => this._player());
    readonly playerStats = computed(() => this._playerStats());
    readonly status = computed(() => this._status());

    constructor(private readonly _playerService: PlayerApiService) {
    }

    reset(): void {
        this._player.set(EMPTY_PLAYER);
        this._playerStats.set(EMPTY_PLAYER_STATS);
        this._status.set(LoadingStatus.NONE);
    }

    retrieve(playerId: string | null): void {
        if (playerId == null) {
            console.error('Invalid player id');
            this._status.set(LoadingStatus.ERROR);
            return;
        }

        this._status.set(LoadingStatus.LOADING);
        forkJoin({
            player: this._playerService.fetch(playerId),
            stats: this._playerService.fetchStats(playerId),
        }).subscribe({
                next: ({player, stats}) => {
                    this._player.set(player);
                    this._playerStats.set(stats);
                    this._status.set(LoadingStatus.FULLY_LOADED);
                },
                error: error => {
                    console.error(error);
                    this._status.set(LoadingStatus.ERROR);
                }
            }
        )
    }
}
