import {inject, Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {IgdbMapping} from "../dtos/igdb/igdb-mapping";
import {IgdbMappingStats} from "../dtos/igdb/igdb-mapping-stats";
import {Pagination} from '../dtos/pagination';

@Injectable({
  providedIn: 'root',
})
export class IgdbMappingApiService {
  private readonly apiUrl = `${environment.apiUrl}/igdb-mapping`;
  private readonly http: HttpClient = inject(HttpClient);

  searchPending(page: number, size: number): Observable<Pagination<IgdbMapping>> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size);
    return this.http.get<Pagination<IgdbMapping>>(this.apiUrl + "/search", {params});
  }

  validateCandidate(gameId: string, candidateId: number): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/${gameId}/candidate/${candidateId}/validate`, null);
  }

  rejectCandidates(gameId: string): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}/${gameId}/candidate/reject-all`, null);
  }

  fetchStats(): Observable<IgdbMappingStats> {
    return this.http.get<IgdbMappingStats>(`${this.apiUrl}/stats`);
  }
}
