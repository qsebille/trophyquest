import {Component, inject} from '@angular/core';
import {NotificationService} from '../services/notification.service';
import {NgbToast} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'tq-app-notification',
  standalone: true,
  imports: [
    NgbToast
  ],
  template: `
    @for (toast of notificationService.notifications; track toast) {
      <ngb-toast
        [class]="toast.classname || ''"
        [autohide]="true"
        [delay]="toast.delay || 5000"
        (hidden)="notificationService.remove(toast)"
      >
        {{ toast.text }}
      </ngb-toast>
    }`,
  host: {
    class: 'toast-container position-fixed top-0 end-0 p-3',
    style: 'z-index: 1200'
  }
})
export class AppNotificationComponent {
  readonly notificationService = inject(NotificationService);
}
