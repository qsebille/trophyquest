import {TestBed} from '@angular/core/testing';

import {PlayerApiService} from './player-api.service';
import {HttpClient} from '@angular/common/http';

describe('PlayerApiService', () => {
    let service: PlayerApiService;
    let httpSpy: jasmine.SpyObj<HttpClient>;

    beforeEach(() => {
        httpSpy = jasmine.createSpyObj('HttpClient', ['get']);

        TestBed.configureTestingModule({
            providers: [
                {provide: HttpClient, useValue: httpSpy},
            ]
        });
        service = TestBed.inject(PlayerApiService);
    });

    it('should be created', () => expect(service).toBeTruthy());
});
