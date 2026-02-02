import {fakeAsync, flushMicrotasks, TestBed} from '@angular/core/testing';

import {PlayerListStore} from './player-list-store';
import {PlayerApiService} from '../../core/api/services/player-api.service';
import {LoadingStatus} from "../../core/models/loading-status.enum";
import {of} from "rxjs";
import {PlayerSearchItem} from "../../core/api/dtos/player/player-search-item";
import {SearchResult} from "../../core/api/dtos/search-result";

describe('PlayerListStore', () => {
    let store: PlayerListStore;

    let playerApiServiceSpy: jasmine.SpyObj<PlayerApiService>;

    beforeEach(() => {
        playerApiServiceSpy = jasmine.createSpyObj<PlayerApiService>('PlayerApiService', ['search', 'count']);
        TestBed.configureTestingModule({
            providers: [
                {provide: PlayerApiService, useValue: playerApiServiceSpy},
            ]
        });
        store = TestBed.inject(PlayerListStore);
    });

    it('should be created', () => {
        expect(store).toBeTruthy();
        expect(store.results()).toEqual([]);
        expect(store.total()).toEqual(0);
        expect(store.status()).toEqual(LoadingStatus.NONE);
    });

    it('should search for players', fakeAsync(() => {
        const mockSearchResult = {
            content: [{id: 'player-1', pseudo: 'John Doe'} as PlayerSearchItem],
            total: 10
        } as SearchResult<PlayerSearchItem>;
        playerApiServiceSpy.search.and.returnValue(of(mockSearchResult));
        playerApiServiceSpy.count.and.returnValue(of(10));

        store.search();
        flushMicrotasks();

        expect(playerApiServiceSpy.search).toHaveBeenCalledWith(0, 20);
        expect(store.results()).toEqual(mockSearchResult.content);
        expect(store.total()).toEqual(10);
        expect(store.status()).toEqual(LoadingStatus.PARTIALLY_LOADED);
    }));
});
