import {TestBed} from '@angular/core/testing';

import {StatsApiService} from './stats-api.service';
import {HttpClient} from "@angular/common/http";

describe('StatsApiService', () => {
    let service: StatsApiService;

    let httpSpy: jasmine.SpyObj<HttpClient>;

    beforeEach(() => {
        httpSpy = jasmine.createSpyObj('HttpClient', ['get']);
        TestBed.configureTestingModule({
            providers: [{provide: HttpClient, useValue: httpSpy}]
        });
        service = TestBed.inject(StatsApiService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
