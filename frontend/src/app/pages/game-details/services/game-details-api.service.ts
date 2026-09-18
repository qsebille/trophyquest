import {inject, Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GameDetailsResponse} from '../models/game-details-response';
import {GamePlayerItem} from '../models/game-player-item';
import {GameTrophyItem} from '../models/game-trophy-item';
import {GameSuiteItem} from '../models/game-suite-item';
import {Pagination} from '../../../core/api/dtos/pagination';

@Injectable({
  providedIn: 'root',
})
export class GameDetailsApiService {
  private readonly apiUrl = `${environment.apiUrl}/game-details`;
  private readonly http: HttpClient = inject(HttpClient);

  fetchDetailsByGameId(gameId: string): Observable<GameDetailsResponse> {
    return this.http.get<GameDetailsResponse>(`${this.apiUrl}/by-game/${gameId}`);
  }

  fetchDetailsBySuiteId(suiteId: string): Observable<GameDetailsResponse> {
    return this.http.get<GameDetailsResponse>(`${this.apiUrl}/by-suite/${suiteId}`);
  }

  fetchPlayersByGameId(gameId: string, page: number, size: number): Observable<Pagination<GamePlayerItem>> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size);
    return this.http.get<Pagination<GamePlayerItem>>(`${this.apiUrl}/by-game/${gameId}/players`, {params});
  }

  fetchPlayersBySuiteId(suiteId: string, page: number, size: number): Observable<Pagination<GamePlayerItem>> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size);
    return this.http.get<Pagination<GamePlayerItem>>(`${this.apiUrl}/by-suite/${suiteId}/players`, {params});
  }

  fetchSuitesByGameId(gameId: string): Observable<GameSuiteItem[]> {
    return this.http.get<GameSuiteItem[]>(`${this.apiUrl}/by-game/${gameId}/suites`);
  }

  fetchTrophiesBySuiteId(suiteId: string, playerId: string | null): Observable<GameTrophyItem[]> {
    const url = `${this.apiUrl}/by-suite/${suiteId}/trophies`
    if (playerId === null) return this.http.get<GameTrophyItem[]>(url);
    else {
      const params = new HttpParams()
        .set("playerId", playerId)
      return this.http.get<GameTrophyItem[]>(url, {params});
    }
  }

}
