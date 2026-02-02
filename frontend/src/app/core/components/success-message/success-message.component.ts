import {Component, input, output} from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";

@Component({
    selector: 'tq-success-message',
    imports: [
        MatIconModule,
        MatButton
    ],
    templateUrl: './success-message.component.html',
    styleUrl: './success-message.component.scss',
})
export class SuccessMessageComponent {
    readonly message = input.required<string>();
    readonly hasButton = input<boolean>(false);
    readonly onClick = output<void>();
}
