import {Component} from '@angular/core';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@Component({
    selector: 'tq-spinner-container',
    imports: [
        MatProgressSpinnerModule
    ],
    templateUrl: './spinner-container.component.html',
    styleUrl: './spinner-container.component.scss',
})
export class SpinnerContainerComponent {

}
