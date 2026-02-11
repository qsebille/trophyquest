import {Component, computed} from '@angular/core';
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

    readonly backgroundUrl = computed(() => this._gameCoverStoreService.gameCover().url);

    constructor(
        private _idleReloadService: IdleReloadService,
        private _gameCoverStoreService: GameCoverStoreService,
    ) {
        this._idleReloadService.start();
    }

}
