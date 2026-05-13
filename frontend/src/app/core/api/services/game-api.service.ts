import {inject, Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {RecentGame} from "../dtos/game/recent-game";
import {GameDetails} from '../dtos/game/game-details';
import {TrophySuite} from '../dtos/trophy-suite/trophy-suite';
import {GamePlayer} from '../dtos/player/game-player';
import {GameSearchItem} from '../dtos/game/game-search-item';
import {Pagination} from '../dtos/pagination';

@Injectable({
  providedIn: 'root',
})
export class GameApiService {
  private readonly apiUrl = `${environment.apiUrl}/game`;
  private readonly http: HttpClient = inject(HttpClient);

  search(searchTerm: string, page: number, size: number): Observable<Pagination<GameSearchItem>> {
    const params = new HttpParams()
      .set('searchTerm', searchTerm)
      .set('page', page)
      .set('size', size);
    return this.http.get<Pagination<GameSearchItem>>(`${this.apiUrl}/search`, {params});
  }

  searchRecent(page: number, size: number): Observable<Pagination<RecentGame>> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size);
    return this.http.get<Pagination<RecentGame>>(`${this.apiUrl}/recent/search`, {params});
  }

  fetchDetails(gameId: string): Observable<GameDetails> {
    return this.http.get<GameDetails>(`${this.apiUrl}/${gameId}/details`);
  }

  fetchTrophySuites(gameId: string): Observable<TrophySuite[]> {
    return this.http.get<TrophySuite[]>(`${this.apiUrl}/${gameId}/trophy-suites`);
  }

  fetchPlayers(gameId: string, page: number, size: number): Observable<Pagination<GamePlayer>> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size);
    return this.http.get<Pagination<GamePlayer>>(`${this.apiUrl}/${gameId}/players`, {params});
  }
}
