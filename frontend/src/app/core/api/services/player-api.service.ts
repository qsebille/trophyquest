import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Player} from '../dtos/player/player';
import {SearchResult} from '../dtos/search-result';
import {TopRecentPlayerRow} from "../dtos/player/top-recent-player-row";
import {environment} from "../../../../environments/environment";
import {PlayerStats} from "../dtos/player/player-stats";
import {PlayerSearchItem} from "../dtos/player/player-search-item";
import {EarnedTrophySearchItem} from "../dtos/trophy/earned-trophy-search-item";
import {PlayedTrophySuiteSearchElement} from "../dtos/trophy-suite/played-trophy-suite-search-element";
import {PlayerAddResponse} from "../dtos/player/player-add-response";

@Injectable({
  providedIn: 'root',
})
export class PlayerApiService {
  private readonly apiUrl = `${environment.apiUrl}/player`;
  private readonly http: HttpClient = inject(HttpClient);

  search(
    pageNumber: number,
    pageSize: number,
  ): Observable<SearchResult<PlayerSearchItem>> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);
    return this.http.get<SearchResult<PlayerSearchItem>>(`${this.apiUrl}/search`, {params});
  }

  fetch(playerId: string): Observable<Player> {
    return this.http.get<Player>(`${this.apiUrl}/${playerId}`);
  }

  fetchByPseudo(pseudo: string): Observable<Player | null> {
    return this.http.get<Player>(`${this.apiUrl}/pseudo/${pseudo}`);
  }

  fetchStats(playerId: string): Observable<PlayerStats> {
    return this.http.get<PlayerStats>(`${this.apiUrl}/${playerId}/stats`);
  }

  searchPlayedTrophySuites(
    playerId: string,
    pageNumber: number,
    pageSize: number
  ): Observable<SearchResult<PlayedTrophySuiteSearchElement>> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);
    return this.http.get<SearchResult<PlayedTrophySuiteSearchElement>>(`${this.apiUrl}/${playerId}/trophy-suite/search`, {params});
  }

  searchEarnedTrophies(
    playerId: string,
    pageNumber: number,
    pageSize: number
  ): Observable<SearchResult<EarnedTrophySearchItem>> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);
    return this.http.get<SearchResult<EarnedTrophySearchItem>>(`${this.apiUrl}/${playerId}/trophy/search`, {params});
  }

  count(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count`);
  }

  countRecent(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/recent/count`);
  }

  fetchTopRecent(): Observable<TopRecentPlayerRow[]> {
    return this.http.get<TopRecentPlayerRow[]>(`${this.apiUrl}/top-recent`);
  }

  addPlayer(pseudo: string): Observable<PlayerAddResponse> {
    return this.http.post<PlayerAddResponse>(`${this.apiUrl}/${pseudo}`, {});
  }

  deletePlayer(playerId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${playerId}`);
  }
}
