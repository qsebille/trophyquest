import {inject, Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {GameCoverImage} from "../dtos/game/game-cover-image";

@Injectable({
  providedIn: 'root',
})
export class CoverApiService {
  private readonly apiUrl = `${environment.apiUrl}/cover`;
  private readonly http: HttpClient = inject(HttpClient);

  fetchRandom(): Observable<GameCoverImage> {
    return this.http.get<GameCoverImage>(`${this.apiUrl}/random`);
  }

  fetchTopPlayedGame(): Observable<GameCoverImage> {
    return this.http.get<GameCoverImage>(`${this.apiUrl}/top-played-game`);
  }

  fetchLastPlayedTrophySuiteForPlayer(playerId: string): Observable<GameCoverImage> {
    return this.http.get<GameCoverImage>(`${this.apiUrl}/player/${playerId}/last-played-trophy-suite`);
  }

  fetchForTrophySuite(trophySuiteId: string): Observable<GameCoverImage> {
    return this.http.get<GameCoverImage>(`${this.apiUrl}/trophy-suite/${trophySuiteId}`);
  }

  fetchForGame(gameId: string): Observable<GameCoverImage> {
    return this.http.get<GameCoverImage>(`${this.apiUrl}/game/${gameId}`);
  }
}
