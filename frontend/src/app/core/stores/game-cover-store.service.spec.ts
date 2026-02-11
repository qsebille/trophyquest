import {TestBed} from '@angular/core/testing';

import {GameCoverStoreService} from './game-cover-store.service';
import {GameApiService} from "../api/services/game-api.service";

describe('GameCoverStoreService', () => {
    let service: GameCoverStoreService;

    let gameApiServiceSpy: jasmine.SpyObj<GameApiService>;

    beforeEach(() => {
        gameApiServiceSpy = jasmine.createSpyObj('GameApiService', ['fetchRandomCoverImage']);
        TestBed.configureTestingModule({
            providers: [{provide: GameApiService, useValue: gameApiServiceSpy}]
        });
        service = TestBed.inject(GameCoverStoreService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
