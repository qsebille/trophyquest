import {inject, Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {EarnedTrophy} from "../dtos/trophy/earned-trophy";

@Injectable({
  providedIn: 'root',
})
export class TrophySuiteApiService {
  private readonly apiUrl = `${environment.apiUrl}/trophy-suite`;
  private readonly http: HttpClient = inject(HttpClient);

  fetchTrophies(trophySuiteId: string, playerId: string | null): Observable<EarnedTrophy[]> {
    if (playerId == null) {
      return this.http.get<EarnedTrophy[]>(`${this.apiUrl}/${trophySuiteId}/trophies`);
    } else {
      const params = new HttpParams().set('playerId', playerId);
      return this.http.get<EarnedTrophy[]>(`${this.apiUrl}/${trophySuiteId}/trophies`, {params});
    }
  }

  getGameIdByTrophySuiteId(trophySuiteId: string): Observable<{ id: string }> {
    return this.http.get<{ id: string }>(`${this.apiUrl}/${trophySuiteId}/game/id`);
  }
}
