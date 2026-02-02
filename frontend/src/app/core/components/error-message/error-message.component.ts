import {Component, input, output} from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";

@Component({
    selector: 'tq-error-message',
    imports: [
        MatIconModule,
        MatButtonModule,
    ],
    templateUrl: './error-message.component.html',
    styleUrl: './error-message.component.scss',
})
export class ErrorMessageComponent {
    readonly errorMessage = input<string>('An error occurred');
    readonly hasRetryButton = input<boolean>(false);
    readonly retry = output<void>();
}
