import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {GameCoverImage} from "../dtos/game/game-cover-image";

@Injectable({
  providedIn: 'root',
})
export class CoverApiService {
  private readonly API_URL = `${environment.apiUrl}/api/cover`;

  constructor(private readonly _http: HttpClient) {
  }

  fetchRandom(): Observable<GameCoverImage> {
    return this._http.get<GameCoverImage>(`${this.API_URL}/random`);
  }

  fetchTopPlayedGame(): Observable<GameCoverImage> {
    return this._http.get<GameCoverImage>(`${this.API_URL}/top-played-game`);
  }

  fetchLastPlayedTrophySuiteForPlayer(playerId: string): Observable<GameCoverImage> {
    return this._http.get<GameCoverImage>(`${this.API_URL}/player/${playerId}/last-played-trophy-suite`);
  }

  fetchForTrophySuite(trophySuiteId: string): Observable<GameCoverImage> {
    return this._http.get<GameCoverImage>(`${this.API_URL}/trophy-suite/${trophySuiteId}`);
  }

  fetchForGame(gameId: string): Observable<GameCoverImage> {
    return this._http.get<GameCoverImage>(`${this.API_URL}/game/${gameId}`);
  }
}
