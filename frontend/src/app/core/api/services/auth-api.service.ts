import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';
import {AuthUser} from '../dtos/auth/auth-user';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private readonly API_URL = `${environment.apiUrl}/api/auth`;
  private readonly _httpClient = inject(HttpClient);

  fetchCurrentUser(): Observable<AuthUser> {
    return this._httpClient.get<AuthUser>(`${this.API_URL}/me`);
  }
}
