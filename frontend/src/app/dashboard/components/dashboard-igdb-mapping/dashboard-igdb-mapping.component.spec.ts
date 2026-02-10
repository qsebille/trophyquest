import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DashboardIgdbMappingComponent} from './dashboard-igdb-mapping.component';
import {EMPTY_IGDB_MAPPING_STATS} from "../../../core/api/dtos/igdb/igdb-mapping-stats";

describe('DashboardIgdbMappingComponent', () => {
    let component: DashboardIgdbMappingComponent;
    let fixture: ComponentFixture<DashboardIgdbMappingComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DashboardIgdbMappingComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(DashboardIgdbMappingComponent);
        fixture.componentRef.setInput('stats', EMPTY_IGDB_MAPPING_STATS);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
