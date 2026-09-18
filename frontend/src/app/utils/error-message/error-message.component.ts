import {Component, input} from '@angular/core';

@Component({
  selector: 'tq-error-message',
  imports: [],
  templateUrl: './error-message.component.html',
  styleUrl: './error-message.component.scss',
})
export class ErrorMessageComponent {
  message = input.required<string>();
}
