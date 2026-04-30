import {inject, Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Trophy} from "../dtos/trophy/trophy";

@Injectable({
  providedIn: 'root',
})
export class TrophySuiteApiService {
  private readonly apiUrl = `${environment.apiUrl}/trophy-suite`;
  private readonly http: HttpClient = inject(HttpClient);

  fetchTrophies(trophySuiteId: string, playerId: string | null): Observable<Trophy[]> {
    if (playerId == null) {
      return this.http.get<Trophy[]>(`${this.apiUrl}/${trophySuiteId}/trophies`);
    } else {
      const params = new HttpParams().set('playerId', playerId);
      return this.http.get<Trophy[]>(`${this.apiUrl}/${trophySuiteId}/trophies`, {params});
    }
  }
}
