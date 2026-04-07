import {Injectable, signal} from '@angular/core';
import {GameCoverImage} from "../api/dtos/game/game-cover-image";
import {Observable} from "rxjs";
import {CoverApiService} from "../api/services/cover-api.service";

@Injectable({
  providedIn: 'root',
})
export class GameCoverStoreService {
  private readonly _gameCover = signal<GameCoverImage>({id: '', url: ''});
  readonly gameCover = this._gameCover.asReadonly();

  constructor(private readonly _coverApiService: CoverApiService) {
  }

  refreshRandom(): void {
    this._replaceGameCover(this._coverApiService.fetchRandom())
  }

  refreshTopPlayedGame(): void {
    this._replaceGameCover(this._coverApiService.fetchTopPlayedGame())
  }

  refreshLastPlayedTrophySuiteForPlayer(playerId: string | null): void {
    if (playerId == null) return;
    this._replaceGameCover(this._coverApiService.fetchLastPlayedTrophySuiteForPlayer(playerId))
  }

  refreshForTrophySuite(trophySuiteId: string | null): void {
    if (trophySuiteId == null) return;
    this._replaceGameCover(this._coverApiService.fetchForTrophySuite(trophySuiteId))
  }

  useGameCover(gameId: string): void {
    this._replaceGameCover(this._coverApiService.fetchForGame(gameId))
  }

  private _replaceGameCover(gameCoverImageObservable: Observable<GameCoverImage>): void {
    gameCoverImageObservable
      .subscribe({
        next: url => this._gameCover.set(url),
        error: (err) => console.error("Failed to fetch cover image", err)
      })
  }
}
