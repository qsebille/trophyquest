import {ComponentFixture, TestBed} from '@angular/core/testing';

import {IgdbMappingPage} from './igdb-mapping-page.component';
import {IgdbMappingStoreService} from "../../stores/igdb-mapping-store.service";

describe('IgdbMappingPage', () => {
    let component: IgdbMappingPage;
    let fixture: ComponentFixture<IgdbMappingPage>;

    let igdbMappingStoreSpy = jasmine.createSpyObj('IgdbMappingStoreService', [
        'reset',
        'search',
        'loadMore',
        'validateCandidate',
        'rejectCandidates',
        'mappingList',
        'status',
        'validationStatus',
    ]);

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [IgdbMappingPage],
            providers: [
                {provide: IgdbMappingStoreService, useValue: igdbMappingStoreSpy}
            ]
        }).compileComponents();

        igdbMappingStoreSpy.mappingList.and.returnValue([]);

        fixture = TestBed.createComponent(IgdbMappingPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => expect(component).toBeTruthy());
});
