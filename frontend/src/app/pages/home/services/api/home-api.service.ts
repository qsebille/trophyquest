import {inject, Injectable} from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HomeGameItem} from '../../models/home-game-item';
import {HomePlayerItem} from '../../models/home-player-item';

@Injectable({
  providedIn: 'root',
})
export class HomeApiService {
  private readonly apiUrl = `${environment.apiUrl}/home`;
  private readonly http: HttpClient = inject(HttpClient);

  fetchTopGames(size: number): Observable<HomeGameItem[]> {
    return this.http.get<HomeGameItem[]>(`${this.apiUrl}/top-games?size=${size}`);
  }

  fetchTopPlayers(size: number): Observable<HomePlayerItem[]> {
    return this.http.get<HomePlayerItem[]>(`${this.apiUrl}/top-players?size=${size}`);
  }

}
