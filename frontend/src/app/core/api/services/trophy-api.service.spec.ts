import {TestBed} from '@angular/core/testing';

import {TrophyApiService} from './trophy-api.service';
import {HttpClient} from '@angular/common/http';

describe('TrophyApiService', () => {
    let service: TrophyApiService;
    let httpSpy: jasmine.SpyObj<HttpClient>;

    beforeEach(() => {
        httpSpy = jasmine.createSpyObj('HttpClient', ['get']);
        TestBed.configureTestingModule({
            providers: [TrophyApiService, {provide: HttpClient, useValue: httpSpy}]
        });
        service = TestBed.inject(TrophyApiService);
    });

    it('should be created', () => expect(service).toBeTruthy());

});
