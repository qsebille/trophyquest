import {Injectable, signal} from '@angular/core';
import {RecentGame} from "../../core/api/dtos/game/recent-game";
import {LoadingStatus} from "../../core/models/loading-status.enum";
import {GameApiService} from "../../core/api/services/game-api.service";

@Injectable({
    providedIn: 'root',
})
export class HomeRecentGamesStore {
    private readonly _pageNumber: number = 0;
    private readonly _pageSize: number = 20;
    private readonly _recentGames = signal<RecentGame[]>([]);
    private readonly _total = signal<number>(0);
    private readonly _status = signal<LoadingStatus>(LoadingStatus.NONE);

    readonly recentGames = this._recentGames.asReadonly();
    readonly status = this._status.asReadonly();
    readonly total = this._total.asReadonly();

    constructor(private _gameApiService: GameApiService) {
    }

    reset(): void {
        this._recentGames.set([]);
        this._total.set(0);
        this._status.set(LoadingStatus.NONE);
    }

    fetch(): void {
        this._status.set(LoadingStatus.LOADING);
        this._gameApiService.searchRecent(this._pageNumber, this._pageSize).subscribe({
            next: (searchResult) => {
                const games = [...this._recentGames(), ...searchResult.content];
                this._recentGames.set(games);
                this._total.set(searchResult.total)
                this._status.set(games.length === this._total() ? LoadingStatus.FULLY_LOADED : LoadingStatus.PARTIALLY_LOADED);
            },
            error: err => {
                console.error('Failed to fetch recent games', err);
                this._status.set(LoadingStatus.ERROR);
            }
        });
    }
}
