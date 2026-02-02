import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PlatformLabelComponent} from './platform-label.component';

describe('PlatformLabelComponent', () => {
    let component: PlatformLabelComponent;
    let fixture: ComponentFixture<PlatformLabelComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PlatformLabelComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(PlatformLabelComponent);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('platform', 'PS5');
        fixture.detectChanges();
    });

    it('should create', () => expect(component).toBeTruthy());
});
