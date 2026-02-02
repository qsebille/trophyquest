import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {SearchResult} from "../dtos/search-result";
import {IgdbMapping} from "../dtos/candidate/igdb-mapping";

@Injectable({
    providedIn: 'root',
})
export class IgdbCandidateApiService {

    private readonly API_URL = `${environment.apiUrl}/api/igdb-candidate`;

    constructor(private readonly _http: HttpClient) {
    }

    searchPending(pageNumber: number, pageSize: number): Observable<SearchResult<IgdbMapping>> {
        const params = new HttpParams()
            .set('pageNumber', pageNumber)
            .set('pageSize', pageSize);
        return this._http.get<SearchResult<IgdbMapping>>(this.API_URL + "/search", {params});
    }

    validateCandidate(gameId: string, candidateId: number): Observable<boolean> {
        return this._http.post<boolean>(`${this.API_URL}/${gameId}/candidate/${candidateId}/validate`, null);
    }

    rejectCandidates(gameId: string): Observable<boolean> {
        return this._http.put<boolean>(`${this.API_URL}/${gameId}/candidate/reject-all`, null);
    }
}
