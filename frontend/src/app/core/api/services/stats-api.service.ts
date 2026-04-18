import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ImageUploadStats} from "../dtos/images/image-upload-stats";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class StatsApiService {
  private readonly apiUrl = `${environment.apiUrl}/stats`;
  private readonly http: HttpClient = inject(HttpClient);

  fetchImageUploadStats(category: string): Observable<ImageUploadStats> {
    return this.http.get<ImageUploadStats>(`${this.apiUrl}/image-upload/${category}`);
  }
}
