import {TestBed} from '@angular/core/testing';

import {IgdbCandidateApiService} from './igdb-candidate-api.service';
import {HttpClient} from "@angular/common/http";

describe('IgdbCandidateApiService', () => {
    let service: IgdbCandidateApiService;

    const httpSpy = jasmine.createSpyObj('HttpClient', ['get']);

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [{provide: HttpClient, useValue: httpSpy}]
        });
        service = TestBed.inject(IgdbCandidateApiService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
