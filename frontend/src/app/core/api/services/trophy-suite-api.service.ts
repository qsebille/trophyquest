import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {EarnedTrophy} from "../dtos/trophy/earned-trophy";
import {TrophySuite} from "../dtos/trophy-suite/trophy-suite";

@Injectable({
    providedIn: 'root',
})
export class TrophySuiteApiService {
    private readonly API_URL = `${environment.apiUrl}/api/trophy-suite`;

    constructor(private readonly _http: HttpClient) {
    }

    fetch(trophySuiteId: string): Observable<TrophySuite> {
        return this._http.get<TrophySuite>(`${this.API_URL}/${trophySuiteId}`);
    }

    fetchTrophies(trophySuiteId: string, playerId: string | null): Observable<EarnedTrophy[]> {
        if (playerId == null) {
            return this._http.get<EarnedTrophy[]>(`${this.API_URL}/${trophySuiteId}/trophies`);
        } else {
            const params = new HttpParams().set('playerId', playerId);
            return this._http.get<EarnedTrophy[]>(`${this.API_URL}/${trophySuiteId}/trophies`, {params});
        }
    }
}
