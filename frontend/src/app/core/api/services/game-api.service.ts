import {inject, Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {SearchResult} from "../dtos/search-result";
import {RecentGame} from "../dtos/game/recent-game";
import {GameDetails} from '../dtos/game/game-details';
import {TrophySuiteWithCounts} from '../dtos/trophy-suite/trophy-suite-with-counts';
import {GamePlayer} from '../dtos/player/game-player';

@Injectable({
  providedIn: 'root',
})
export class GameApiService {
  private readonly apiUrl = `${environment.apiUrl}/game`;
  private readonly http: HttpClient = inject(HttpClient);

  count(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count`);
  }

  countRecent(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/recent/count`);
  }

  searchRecent(pageNumber: number, pageSize: number): Observable<SearchResult<RecentGame>> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);
    return this.http.get<SearchResult<RecentGame>>(`${this.apiUrl}/recent/search`, {params});
  }

  fetchDetails(gameId: string): Observable<GameDetails> {
    return this.http.get<GameDetails>(`${this.apiUrl}/${gameId}/details`);
  }

  fetchTrophySuites(gameId: string): Observable<TrophySuiteWithCounts[]> {
    return this.http.get<TrophySuiteWithCounts[]>(`${this.apiUrl}/${gameId}/trophy-suites`);
  }

  fetchPlayers(gameId: string, pageNumber: number, pageSize: number): Observable<SearchResult<GamePlayer>> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);
    return this.http.get<SearchResult<GamePlayer>>(`${this.apiUrl}/${gameId}/players`, {params});
  }

}
