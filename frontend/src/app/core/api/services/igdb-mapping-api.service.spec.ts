import {TestBed} from '@angular/core/testing';

import {IgdbMappingApiService} from './igdb-mapping-api.service';
import {HttpClient} from "@angular/common/http";

describe('IgdbMappingApiService', () => {
    let service: IgdbMappingApiService;

    const httpSpy = jasmine.createSpyObj('HttpClient', ['get']);

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [{provide: HttpClient, useValue: httpSpy}]
        });
        service = TestBed.inject(IgdbMappingApiService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
