import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {SearchResult} from "../dtos/search-result";
import {RecentGame} from "../dtos/game/recent-game";

@Injectable({
    providedIn: 'root',
})
export class GameApiService {
    private readonly API_URL = `${environment.apiUrl}/api/game`;

    constructor(private readonly _http: HttpClient) {
    }

    count(): Observable<number> {
        return this._http.get<number>(`${this.API_URL}/count`);
    }

    countRecent(): Observable<number> {
        return this._http.get<number>(`${this.API_URL}/recent/count`);
    }

    searchRecent(pageNumber: number, pageSize: number): Observable<SearchResult<RecentGame>> {
        const params = new HttpParams()
            .set('pageNumber', pageNumber)
            .set('pageSize', pageSize);
        return this._http.get<SearchResult<RecentGame>>(`${this.API_URL}/recent/search`, {params});
    }
}
