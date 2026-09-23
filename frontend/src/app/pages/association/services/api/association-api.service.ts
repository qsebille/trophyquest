import {inject, Injectable} from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Pagination} from '../../../../core/api/dtos/pagination';
import {AssociationItem} from '../../models/association-item';

@Injectable({
  providedIn: 'root',
})
export class AssociationApiService {
  private readonly apiUrl = `${environment.apiUrl}/association`;
  private readonly http: HttpClient = inject(HttpClient);

  fetchAssociation(page: number) {
    return this.http.get<Pagination<AssociationItem>>(`${this.apiUrl}?page=${page}`);
  }

  validateAssociation(suiteId: string, gameId: number) {
    return this.http.post<boolean>(`${this.apiUrl}/validate`, {suiteId, gameId});
  }

  rejectAllCandidates(suiteId: string) {
    return this.http.post<boolean>(`${this.apiUrl}/reject`, {suiteId});
  }

}
