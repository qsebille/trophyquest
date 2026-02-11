import {Injectable, signal} from '@angular/core';
import {GameApiService} from "../api/services/game-api.service";
import {GameCoverImage} from "../api/dtos/game/game-cover-image";

@Injectable({
    providedIn: 'root',
})
export class GameCoverStoreService {
    private readonly _gameCover = signal<GameCoverImage>({id: '', url: ''});
    readonly gameCover = this._gameCover.asReadonly();

    constructor(private readonly _gameApiService: GameApiService) {
    }

    refreshRandom(): void {
        this._gameApiService.fetchRandomCoverImage()
            .subscribe({
                next: url => this._gameCover.set(url),
                error: (err) => console.error("Failed to fetch random cover image", err)
            })
    }
}
