import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ImageUploadStats} from "../dtos/images/image-upload-stats";
import {environment} from "../../../../environments/environment";

@Injectable({
    providedIn: 'root',
})
export class StatsApiService {
    private readonly API_URL = `${environment.apiUrl}/api/stats`;

    constructor(private _http: HttpClient) {
    }

    fetchImageUploadStats(category: string): Observable<ImageUploadStats> {
        return this._http.get<ImageUploadStats>(`${this.API_URL}/image-upload/${category}`);
    }
}
