import {computed, Injectable, signal} from '@angular/core';
import {PlayerApiService} from '../../core/api/services/player-api.service';
import {LoadingStatus} from '../../core/models/loading-status.enum';
import {PlayerSearchItem} from "../../core/api/dtos/player/player-search-item";
import {catchError, EMPTY, switchMap, tap} from "rxjs";
import {AddPlayerStatus} from "../../core/models/add-player-status.enum";
import {Player} from "../../core/api/dtos/player/player";
import {PlayerAddResponse} from "../../core/api/dtos/player/player-add-response";

@Injectable({
    providedIn: 'root',
})
export class PlayerListStore {
    private readonly _pageSize = 20;

    private readonly _pageNumber = signal<number>(0);
    private readonly _results = signal<PlayerSearchItem[]>([]);
    private readonly _total = signal<number>(0);
    private readonly _status = signal<LoadingStatus>(LoadingStatus.NONE);
    private readonly _addStatus = signal<AddPlayerStatus>(AddPlayerStatus.NONE);

    readonly results = computed(() => this._results());
    readonly total = computed(() => this._total());
    readonly status = computed(() => this._status());
    readonly addStatus = computed(() => this._addStatus());

    constructor(private readonly _playerService: PlayerApiService) {
    }

    resetSearch(): void {
        this._pageNumber.set(0);
        this._results.set([]);
        this._total.set(0);
        this._status.set(LoadingStatus.NONE);
    }

    resetAddPlayerStatus(): void {
        this._addStatus.set(AddPlayerStatus.NONE);
    }

    search(): void {
        this._status.set(LoadingStatus.LOADING);

        console.debug('Searching players...');
        this._playerService.search(this._pageNumber(), this._pageSize).subscribe({
            next: searchResult => {
                console.log(searchResult);
                const players = [...this.results(), ...searchResult.content];
                const loadingStatus: LoadingStatus = players.length < searchResult.total ? LoadingStatus.PARTIALLY_LOADED : LoadingStatus.FULLY_LOADED;
                this._results.update(() => players);
                this._total.set(searchResult.total);
                this._status.set(loadingStatus);
            },
            error: error => {
                this._status.set(LoadingStatus.ERROR);
                console.error(error)
            },
        });
    }

    loadMore(): void {
        this._pageNumber.update(n => n + 1);
        this.search();
    }

    addPlayer(pseudo: string): void {
        this._addStatus.set(AddPlayerStatus.LOADING);

        this._playerService.fetchByPseudo(pseudo).pipe(
            switchMap((response: Player | null) => {
                if (response === null) {
                    console.info("Player not found in database, adding it to database...");
                    this._addStatus.set(AddPlayerStatus.LOADING);
                    return this._playerService.addPlayer(pseudo);
                } else {
                    console.info("Player already in database, not adding it to database");
                    this._addStatus.set(AddPlayerStatus.ALREADY_IN_DATABASE);
                    return EMPTY;
                }
            }),
            tap((lambdaResponse: PlayerAddResponse) => {
                switch (lambdaResponse.status) {
                    case 'OK':
                        this._addStatus.set(AddPlayerStatus.ADDED);
                        this.resetSearch();
                        this.search();
                        break;
                    case 'ERROR':
                        this._addStatus.set(AddPlayerStatus.ERROR_WHEN_ADDING);
                }
            }),
            catchError(() => {
                this._addStatus.set(AddPlayerStatus.ERROR_WHEN_ADDING);
                return EMPTY;
            })
        ).subscribe();
    }
}
