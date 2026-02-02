import {TestBed} from '@angular/core/testing';

import {HomeRecentGamesStore} from './home-recent-games-store.service';
import {GameApiService} from "../../core/api/services/game-api.service";

describe('HomeRecentGamesStore', () => {
    let service: HomeRecentGamesStore;

    const gameApiServiceSpy = jasmine.createSpyObj('GameApiService', ['searchRecent']);

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {provide: GameApiService, useValue: gameApiServiceSpy}
            ]
        });
        service = TestBed.inject(HomeRecentGamesStore);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
