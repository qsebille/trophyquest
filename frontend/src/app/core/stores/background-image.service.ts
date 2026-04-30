import {inject, Injectable, signal} from '@angular/core';
import {BackgroundImage} from "../api/dtos/game/background-image";
import {Observable} from "rxjs";
import {BackgroundImageApiService} from "../api/services/background-image-api.service";

@Injectable({
  providedIn: 'root',
})
export class BackgroundImageService {
  private readonly backgroundImageApiService: BackgroundImageApiService = inject(BackgroundImageApiService);
  private readonly _backgroundImage = signal<BackgroundImage>({url: ''});

  readonly backgroundImage = this._backgroundImage.asReadonly();

  useTopPlayedGame(): void {
    this.replaceBackground(this.backgroundImageApiService.fetchTopPlayedGame())
  }

  usePlayerLastGameBackground(playerId: string | null): void {
    if (playerId == null) return;
    this.replaceBackground(this.backgroundImageApiService.fetchPlayerLastGameBackground(playerId))
  }

  useGameBackground(gameId: string): void {
    this.replaceBackground(this.backgroundImageApiService.fetchForGame(gameId))
  }

  private replaceBackground(gameCoverImageObservable: Observable<BackgroundImage>): void {
    gameCoverImageObservable
      .subscribe({
        next: url => this._backgroundImage.set(url),
        error: (err) => console.error("Failed to fetch cover image", err)
      })
  }
}
