import {TestBed} from '@angular/core/testing';

import {TrophySuiteApiService} from './trophy-suite-api.service';
import {HttpClient} from "@angular/common/http";

describe('TrophySuiteApiService', () => {
    let service: TrophySuiteApiService;

    let httpSpy: jasmine.SpyObj<HttpClient>;

    beforeEach(() => {
        httpSpy = jasmine.createSpyObj('HttpClient', ['get']);
        TestBed.configureTestingModule({
            providers: [{provide: HttpClient, useValue: httpSpy}]
        });
        service = TestBed.inject(TrophySuiteApiService);
    });

    it('should be created', () => expect(service).toBeTruthy());
});
