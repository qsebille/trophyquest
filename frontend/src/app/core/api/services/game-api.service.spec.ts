import {TestBed} from '@angular/core/testing';

import {GameApiService} from './game-api.service';
import {HttpClient} from "@angular/common/http";

describe('GameApiService', () => {
    let service: GameApiService;

    let httpSpy: jasmine.SpyObj<HttpClient>

    beforeEach(() => {
        httpSpy = jasmine.createSpyObj('HttpClient', ['get']);
        TestBed.configureTestingModule({
            providers: [{provide: HttpClient, useValue: httpSpy}]
        });
        service = TestBed.inject(GameApiService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
