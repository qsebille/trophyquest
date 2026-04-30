import {Component, computed, inject} from '@angular/core';
import {NavbarComponent} from './core/components/navbar/navbar.component';
import {RouterOutlet} from '@angular/router';
import {IdleReloadService} from "./core/services/idle-reload.service";
import {BackgroundImageService} from "./core/stores/background-image.service";
import {AppNotificationComponent} from './core/app-notification/app-notification.component';

@Component({
  selector: 'tq-root',
  imports: [
    RouterOutlet,
    NavbarComponent,
    AppNotificationComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly backgroundImageService = inject(BackgroundImageService);
  private readonly idleReloadService = inject(IdleReloadService);

  readonly backgroundUrl = computed(() => {
    const url = this.backgroundImageService.backgroundImage().url;
    return url ? `url(${url})` : 'none';
  });

  ngOnInit(): void {
    this.idleReloadService.start();
  }
}
