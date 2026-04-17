import {Component, computed, inject} from '@angular/core';
import {NavbarComponent} from './core/components/navbar/navbar.component';
import {RouterOutlet} from '@angular/router';
import {IdleReloadService} from "./core/services/idle-reload.service";
import {GameCoverStoreService} from "./core/stores/game-cover-store.service";

@Component({
  selector: 'tq-root',
  imports: [
    RouterOutlet,
    NavbarComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly _gameCoverStoreService = inject(GameCoverStoreService);
  private readonly _idleReloadService = inject(IdleReloadService);

  readonly backgroundUrl = computed(() => this._gameCoverStoreService.gameCover().url);

  ngOnInit(): void {
    this._idleReloadService.start();
  }

}
