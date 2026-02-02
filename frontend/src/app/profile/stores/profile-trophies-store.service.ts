import {computed, Injectable, signal} from '@angular/core';
import {LoadingStatus} from "../../core/models/loading-status.enum";
import {PlayerApiService} from "../../core/api/services/player-api.service";
import {EarnedTrophySearchItem} from "../../core/api/dtos/trophy/earned-trophy-search-item";

@Injectable({
    providedIn: 'root',
})
export class ProfileTrophiesStore {
    private readonly _pageSize = 20;
    private readonly _pageNumber = signal<number>(0);
    private readonly _trophies = signal<EarnedTrophySearchItem[]>([]);
    private readonly _status = signal<LoadingStatus>(LoadingStatus.NONE);

    readonly trophies = computed(() => this._trophies());
    readonly status = computed(() => this._status());

    constructor(private readonly _playerService: PlayerApiService) {
    }

    reset(): void {
        this._trophies.set([]);
        this._pageNumber.set(0);
        this._status.set(LoadingStatus.NONE);
    }

    search(playerId: string | null): void {
        if (playerId == null) {
            console.error('Invalid player id');
            this._status.set(LoadingStatus.ERROR);
            return;
        }

        this._status.set(LoadingStatus.LOADING);
        this._playerService.searchEarnedTrophies(playerId, this._pageNumber(), this._pageSize).subscribe({
            next: searchResult => {
                const trophies = [...this._trophies(), ...searchResult.content];
                const loadingStatus: LoadingStatus = trophies.length < searchResult.total ? LoadingStatus.PARTIALLY_LOADED : LoadingStatus.FULLY_LOADED;
                this._trophies.update(() => trophies);
                this._status.set(loadingStatus);
            },
            error: () => {
                console.error(`Failed loading trophies for player ${playerId}`);
                this._status.set(LoadingStatus.ERROR);
            }
        });
    }

    loadMore(playerId: string | null): void {
        this._pageNumber.update(n => n + 1);
        this.search(playerId);
    }
}
