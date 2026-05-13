import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Player} from '../dtos/player/player';
import {environment} from "../../../../environments/environment";
import {PlayerSearchItem} from "../dtos/player/player-search-item";
import {PlayerEarnedTrophy} from "../dtos/trophy/player-earned-trophy";
import {PlayerTrophySuite} from "../dtos/trophy-suite/player-trophy-suite";
import {PlayerAddResponse} from "../dtos/player/player-add-response";
import {Pagination} from '../dtos/pagination';
import {ActivePlayerTrophy} from '../dtos/player/active-player-trophy';

@Injectable({
  providedIn: 'root',
})
export class PlayerApiService {
  private readonly apiUrl = `${environment.apiUrl}/player`;
  private readonly http: HttpClient = inject(HttpClient);

  search(page: number, size: number): Observable<Pagination<PlayerSearchItem>> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size);
    return this.http.get<Pagination<PlayerSearchItem>>(`${this.apiUrl}/search`, {params});
  }

  fetchByPseudo(pseudo: string): Observable<Player | null> {
    return this.http.get<Player>(`${this.apiUrl}/pseudo/${pseudo}`);
  }

  fetch(playerId: string): Observable<PlayerSearchItem> {
    return this.http.get<PlayerSearchItem>(`${this.apiUrl}/${playerId}`);
  }

  searchPlayedTrophySuites(playerId: string, page: number, size: number): Observable<Pagination<PlayerTrophySuite>> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size);
    return this.http.get<Pagination<PlayerTrophySuite>>(`${this.apiUrl}/${playerId}/trophy-suite/search`, {params});
  }

  searchEarnedTrophies(playerId: string, page: number, size: number): Observable<Pagination<PlayerEarnedTrophy>> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size);
    return this.http.get<Pagination<PlayerEarnedTrophy>>(`${this.apiUrl}/${playerId}/trophy/search`, {params});
  }

  fetchTopActive(): Observable<ActivePlayerTrophy[]> {
    return this.http.get<ActivePlayerTrophy[]>(`${this.apiUrl}/top-active`);
  }

  addPlayer(pseudo: string): Observable<PlayerAddResponse> {
    return this.http.post<PlayerAddResponse>(`${this.apiUrl}/${pseudo}`, {});
  }

  deletePlayer(playerId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${playerId}`);
  }
}
