import {TestBed} from '@angular/core/testing';

import {IgdbMappingStoreService} from './igdb-mapping-store.service';
import {IgdbCandidateApiService} from "../../core/api/services/igdb-candidate-api.service";

describe('IgdbMappingStoreService', () => {
    let store: IgdbMappingStoreService;

    const igdbCandidateApiServiceSpy = jasmine.createSpyObj('IgdbCandidateApiService', [
        'searchPending',
        'validateCandidate',
        'rejectCandidates',
    ]);

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [{provide: IgdbCandidateApiService, useValue: igdbCandidateApiServiceSpy}]
        });
        store = TestBed.inject(IgdbMappingStoreService);
    });

    it('should be created', () => expect(store).toBeTruthy());
});
