import {Injectable} from '@angular/core';
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
    private readonly API_URL = `${environment.apiUrl}/api/player`;

    constructor(private readonly _http: HttpClient) {
    }

    search(
        pageNumber: number,
        pageSize: number,
    ): Observable<SearchResult<PlayerSearchItem>> {
        const params = new HttpParams()
            .set('pageNumber', pageNumber)
            .set('pageSize', pageSize);
        return this._http.get<SearchResult<PlayerSearchItem>>(`${this.API_URL}/search`, {params});
    }

    fetch(playerId: string): Observable<Player> {
        return this._http.get<Player>(`${this.API_URL}/${playerId}`);
    }

    fetchByPseudo(pseudo: string): Observable<Player | null> {
        return this._http.get<Player>(`${this.API_URL}/pseudo/${pseudo}`);
    }

    fetchStats(playerId: string): Observable<PlayerStats> {
        return this._http.get<PlayerStats>(`${this.API_URL}/${playerId}/stats`);
    }

    searchPlayedTrophySuites(
        playerId: string,
        pageNumber: number,
        pageSize: number
    ): Observable<SearchResult<PlayedTrophySuiteSearchElement>> {
        const params = new HttpParams()
            .set('pageNumber', pageNumber)
            .set('pageSize', pageSize);
        return this._http.get<SearchResult<PlayedTrophySuiteSearchElement>>(`${this.API_URL}/${playerId}/trophy-suite/search`, {params});
    }

    searchEarnedTrophies(
        playerId: string,
        pageNumber: number,
        pageSize: number
    ): Observable<SearchResult<EarnedTrophySearchItem>> {
        const params = new HttpParams()
            .set('pageNumber', pageNumber)
            .set('pageSize', pageSize);
        return this._http.get<SearchResult<EarnedTrophySearchItem>>(`${this.API_URL}/${playerId}/trophy/search`, {params});
    }

    count(): Observable<number> {
        return this._http.get<number>(`${this.API_URL}/count`);
    }

    countRecent(): Observable<number> {
        return this._http.get<number>(`${this.API_URL}/recent/count`);
    }

    fetchTopRecent(): Observable<TopRecentPlayerRow[]> {
        return this._http.get<TopRecentPlayerRow[]>(`${this.API_URL}/top-recent`);
    }

    addPlayer(pseudo: string): Observable<PlayerAddResponse> {
        return this._http.post<PlayerAddResponse>(`${this.API_URL}/${pseudo}`, {});
    }
}
