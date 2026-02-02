import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddPlayerFormComponent} from './add-player-form.component';
import {AddPlayerStatus} from "../../../core/models/add-player-status.enum";

describe('AddPlayerFormComponent', () => {
    let component: AddPlayerFormComponent;
    let fixture: ComponentFixture<AddPlayerFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AddPlayerFormComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(AddPlayerFormComponent);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('status', AddPlayerStatus.NONE);
        fixture.detectChanges();
    });

    it('should create', () => expect(component).toBeTruthy());
});
