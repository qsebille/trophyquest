import {Injectable, signal} from '@angular/core';
import {LoadingStatus} from "../../core/models/loading-status.enum";
import {PlayerApiService} from "../../core/api/services/player-api.service";
import {PlayedTrophySuiteSearchElement} from "../../core/api/dtos/trophy-suite/played-trophy-suite-search-element";

@Injectable({
    providedIn: 'root',
})
export class ProfileTrophySuiteListStoreService {
    private readonly _pageSize = 20
    private readonly _pageNumber = signal<number>(0)
    private readonly _trophySuites = signal<PlayedTrophySuiteSearchElement[]>([])
    private readonly _status = signal<LoadingStatus>(LoadingStatus.NONE)

    readonly trophySuites = this._trophySuites.asReadonly()
    readonly status = this._status.asReadonly()

    constructor(private readonly _playerApiService: PlayerApiService) {
    }

    reset(): void {
        this._trophySuites.set([]);
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
        this._playerApiService.searchPlayedTrophySuites(playerId, this._pageNumber(), this._pageSize).subscribe({
            next: searchResult => {
                const trophySuites = [...this._trophySuites(), ...searchResult.content];
                const loadingStatus: LoadingStatus = trophySuites.length < searchResult.total ? LoadingStatus.PARTIALLY_LOADED : LoadingStatus.FULLY_LOADED;
                this._trophySuites.update(() => trophySuites);
                this._status.set(loadingStatus);
            },
            error: () => {
                console.error(`Failed loading trophy suites for player ${playerId}`);
                this._status.set(LoadingStatus.ERROR);
            }
        })
    }

    loadMore(playerId: string | null): void {
        this._pageNumber.update(n => n + 1);
        this.search(playerId);
    }
}
