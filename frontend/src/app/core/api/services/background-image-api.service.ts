import {inject, Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BackgroundImageResponse} from "../dtos/background-image-response";

@Injectable({
  providedIn: 'root',
})
export class BackgroundImageApiService {
  private readonly apiUrl = `${environment.apiUrl}/background`;
  private readonly http: HttpClient = inject(HttpClient);

  fetchForHome(): Observable<BackgroundImageResponse> {
    return this.http.get<BackgroundImageResponse>(`${this.apiUrl}/home`);
  }

  fetchForPlayer(playerId: string): Observable<BackgroundImageResponse> {
    return this.http.get<BackgroundImageResponse>(`${this.apiUrl}/player/${playerId}`);
  }

  fetchForGame(gameId: string): Observable<BackgroundImageResponse> {
    return this.http.get<BackgroundImageResponse>(`${this.apiUrl}/game/${gameId}`);
  }
}
