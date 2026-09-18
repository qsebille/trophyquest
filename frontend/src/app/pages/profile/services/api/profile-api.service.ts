import {inject, Injectable} from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ProfileDetailsResponse} from '../../models/profile-details-response';
import {ProfileSuiteItem} from '../../models/profile-suite-item';
import {Pagination} from '../../../../core/api/dtos/pagination';
import {ProfileTrophyItem} from '../../models/profile-trophy-item';

@Injectable({
  providedIn: 'root',
})
export class ProfileApiService {
  private readonly apiUrl = `${environment.apiUrl}/profile`;
  private readonly http: HttpClient = inject(HttpClient);

  fetchDetails(playerId: string): Observable<ProfileDetailsResponse> {
    return this.http.get<ProfileDetailsResponse>(`${this.apiUrl}/${playerId}/details`);
  }

  searchSuites(playerId: string, page: number, size: number): Observable<Pagination<ProfileSuiteItem>> {
    return this.http.get<Pagination<ProfileSuiteItem>>(`${this.apiUrl}/${playerId}/suites?page=${page}&size=${size}`);
  }

  searchTrophies(playerId: string, page: number, size: number): Observable<Pagination<ProfileTrophyItem>> {
    return this.http.get<Pagination<ProfileTrophyItem>>(`${this.apiUrl}/${playerId}/trophies?page=${page}&size=${size}`);
  }

}
