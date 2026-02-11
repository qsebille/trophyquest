import {TestBed} from '@angular/core/testing';

import {CoverApiService} from './cover-api.service';
import {HttpClient} from "@angular/common/http";

describe('CoverApiService', () => {
    let service: CoverApiService;

    let httpSpy: jasmine.SpyObj<HttpClient>;

    beforeEach(() => {
        httpSpy = jasmine.createSpyObj('HttpClient', ['get']);
        TestBed.configureTestingModule({
            providers: [{provide: HttpClient, useValue: httpSpy}]
        });
        service = TestBed.inject(CoverApiService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
