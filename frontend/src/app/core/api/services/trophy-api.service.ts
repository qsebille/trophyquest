import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../../../environments/environment";

@Injectable({
    providedIn: 'root',
})
export class TrophyApiService {
    private readonly API_URL = `${environment.apiUrl}/api/trophy`;

    constructor(private _http: HttpClient) {
    }

    count(): Observable<number> {
        return this._http.get<number>(`${this.API_URL}/count`);
    }

    countRecentlyEarned(): Observable<number> {
        return this._http.get<number>(`${this.API_URL}/earned/recent/count`);
    }
}
