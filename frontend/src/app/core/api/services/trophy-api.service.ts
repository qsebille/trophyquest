import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class TrophyApiService {
  private readonly apiUrl = `${environment.apiUrl}/trophy`;
  private readonly http: HttpClient = inject(HttpClient);

  count(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count`);
  }

  countRecentlyEarned(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/earned/recent/count`);
  }
}
