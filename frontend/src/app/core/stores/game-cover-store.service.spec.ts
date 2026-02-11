import {TestBed} from '@angular/core/testing';

import {GameCoverStoreService} from './game-cover-store.service';
import {CoverApiService} from "../api/services/cover-api.service";

describe('GameCoverStoreService', () => {
    let service: GameCoverStoreService;

    let coverApiServiceSpy: jasmine.SpyObj<CoverApiService>;

    beforeEach(() => {
        coverApiServiceSpy = jasmine.createSpyObj('CoverApiService', [
            'fetchRandom',
            'fetchTopPlayedGame'
        ]);
        TestBed.configureTestingModule({
            providers: [{provide: CoverApiService, useValue: coverApiServiceSpy}]
        });
        service = TestBed.inject(GameCoverStoreService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
