import {Component} from '@angular/core';
import {NavbarComponent} from './core/components/navbar/navbar.component';
import {RouterOutlet} from '@angular/router';
import {IdleReloadService} from "./core/services/idle-reload.service";

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

    constructor(private _idleReloadService: IdleReloadService) {
        this._idleReloadService.start();
    }

}
