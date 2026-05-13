import {inject, Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BackgroundImage} from "../dtos/game/background-image";

@Injectable({
  providedIn: 'root',
})
export class BackgroundImageApiService {
  private readonly apiUrl = `${environment.apiUrl}/background-image`;
  private readonly http: HttpClient = inject(HttpClient);

  fetchTopPlayedGame(): Observable<BackgroundImage> {
    return this.http.get<BackgroundImage>(`${this.apiUrl}/top-played-game`);
  }

  fetchPlayerLastGameBackground(playerId: string): Observable<BackgroundImage> {
    return this.http.get<BackgroundImage>(`${this.apiUrl}/player/${playerId}`);
  }

  fetchForGame(gameId: string): Observable<BackgroundImage> {
    return this.http.get<BackgroundImage>(`${this.apiUrl}/game/${gameId}`);
  }
}
