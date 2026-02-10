import {Injectable, signal} from '@angular/core';
import {EMPTY_TROPHY_SUITE, TrophySuite} from "../../core/api/dtos/trophy-suite/trophy-suite";
import {EarnedTrophy} from "../../core/api/dtos/trophy/earned-trophy";
import {LoadingStatus} from "../../core/models/loading-status.enum";
import {TrophySuiteApiService} from "../../core/api/services/trophy-suite-api.service";
import {forkJoin} from "rxjs";
import {EMPTY_GAME, TrophySuiteGameDetails} from "../../core/api/dtos/game/trophy-suite-game-details";

@Injectable({
    providedIn: 'root',
})
export class TrophySuiteStoreService {
    private readonly _trophySuite = signal<TrophySuite>(EMPTY_TROPHY_SUITE)
    private readonly _trophies = signal<EarnedTrophy[]>([])
    private readonly _game = signal<TrophySuiteGameDetails>(EMPTY_GAME)
    private readonly _status = signal<LoadingStatus>(LoadingStatus.NONE)

    readonly trophySuite = this._trophySuite.asReadonly()
    readonly trophies = this._trophies.asReadonly()
    readonly gameDetails = this._game.asReadonly()
    readonly status = this._status.asReadonly()

    constructor(private readonly _trophySuiteApiService: TrophySuiteApiService) {
    }

    reset(): void {
        this._trophySuite.set(EMPTY_TROPHY_SUITE);
        this._game.set(EMPTY_GAME);
        this._trophies.set([]);
        this._status.set(LoadingStatus.NONE);
    }

    retrieve(trophySuiteId: string, playerId: string | null): void {
        this._status.set(LoadingStatus.LOADING);
        forkJoin({
            trophySuite: this._trophySuiteApiService.fetch(trophySuiteId),
            trophies: this._trophySuiteApiService.fetchTrophies(trophySuiteId, playerId),
            game: this._trophySuiteApiService.fetchGame(trophySuiteId),
        }).subscribe({
            next: ({trophySuite, trophies, game}) => {
                this._trophySuite.set(trophySuite);
                this._trophies.set(trophies);
                this._game.set(game);
                this._status.set(LoadingStatus.FULLY_LOADED);
            },
            error: error => {
                console.error('Failed to load trophy suite data', error);
                this._status.set(LoadingStatus.ERROR);
            }
        });
    }
}
