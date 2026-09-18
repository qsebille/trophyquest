import {inject, Injectable, signal} from '@angular/core';
import {BackgroundImageResponse} from "../api/dtos/background-image-response";
import {Observable} from "rxjs";
import {BackgroundImageApiService} from "../api/services/background-image-api.service";

@Injectable({
  providedIn: 'root',
})
export class BackgroundImageService {
  private readonly backgroundImageApiService: BackgroundImageApiService = inject(BackgroundImageApiService);
  private readonly _backgroundImage = signal<BackgroundImageResponse>({url: ''});

  readonly backgroundImage = this._backgroundImage.asReadonly();

  useTopPlayedGame(): void {
    this.replaceBackground(this.backgroundImageApiService.fetchForHome())
  }

  usePlayerLastGameBackground(playerId: string | null): void {
    if (playerId == null) return;
    this.replaceBackground(this.backgroundImageApiService.fetchForPlayer(playerId))
  }

  useGameBackground(gameId: string): void {
    this.replaceBackground(this.backgroundImageApiService.fetchForGame(gameId))
  }

  private replaceBackground(gameCoverImageObservable: Observable<BackgroundImageResponse>): void {
    gameCoverImageObservable
      .subscribe({
        next: url => this._backgroundImage.set(url),
        error: (err) => console.error("Failed to fetch background", err)
      })
  }
}
