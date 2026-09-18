import {inject, Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {GameSearchItem} from '../dtos/game/game-search-item';
import {Pagination} from '../dtos/pagination';

@Injectable({
  providedIn: 'root',
})
export class GameApiService {
  private readonly apiUrl = `${environment.apiUrl}/game`;
  private readonly http: HttpClient = inject(HttpClient);

  search(searchTerm: string, page: number, size: number): Observable<Pagination<GameSearchItem>> {
    const params = new HttpParams()
      .set('searchTerm', searchTerm)
      .set('page', page)
      .set('size', size);
    return this.http.get<Pagination<GameSearchItem>>(`${this.apiUrl}/search`, {params});
  }
}
