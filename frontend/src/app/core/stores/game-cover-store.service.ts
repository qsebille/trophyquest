import {inject, Injectable, signal} from '@angular/core';
import {GameCoverImage} from "../api/dtos/game/game-cover-image";
import {Observable} from "rxjs";
import {CoverApiService} from "../api/services/cover-api.service";

@Injectable({
  providedIn: 'root',
})
export class GameCoverStoreService {
  private readonly coverApiService: CoverApiService = inject(CoverApiService);
  private readonly _gameCover = signal<GameCoverImage>({id: '', url: ''});

  readonly gameCover = this._gameCover.asReadonly();

  refreshTopPlayedGame(): void {
    this.replaceGameCover(this.coverApiService.fetchTopPlayedGame())
  }

  refreshLastPlayedTrophySuiteForPlayer(playerId: string | null): void {
    if (playerId == null) return;
    this.replaceGameCover(this.coverApiService.fetchLastPlayedTrophySuiteForPlayer(playerId))
  }

  useGameCover(gameId: string): void {
    this.replaceGameCover(this.coverApiService.fetchForGame(gameId))
  }

  private replaceGameCover(gameCoverImageObservable: Observable<GameCoverImage>): void {
    gameCoverImageObservable
      .subscribe({
        next: url => this._gameCover.set(url),
        error: (err) => console.error("Failed to fetch cover image", err)
      })
  }
}
