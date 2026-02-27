import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DashboardImageUploadComponent} from './dashboard-image-upload.component';
import {ImageUploadStats} from "../../../core/api/dtos/images/image-upload-stats";

describe('DashboardImageUploadComponent', () => {
    let component: DashboardImageUploadComponent;
    let fixture: ComponentFixture<DashboardImageUploadComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DashboardImageUploadComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(DashboardImageUploadComponent);
        fixture.componentRef.setInput('psnUploads', {pending: 0, uploaded: 0} as ImageUploadStats);
        fixture.componentRef.setInput('igdbUploads', {pending: 0, uploaded: 0} as ImageUploadStats);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
