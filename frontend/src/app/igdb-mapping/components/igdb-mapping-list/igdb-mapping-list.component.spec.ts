import {ComponentFixture, TestBed} from '@angular/core/testing';

import {IgdbMappingListComponent} from './igdb-mapping-list.component';

describe('IgdbMappingListComponent', () => {
    let component: IgdbMappingListComponent;
    let fixture: ComponentFixture<IgdbMappingListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [IgdbMappingListComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(IgdbMappingListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => expect(component).toBeTruthy());
});
