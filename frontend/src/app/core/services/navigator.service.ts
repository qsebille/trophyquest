import {Injectable} from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root',
})
export class NavigatorService {

    constructor(private _router: Router) {
    }

    goToPlayersPage(): void {
        this._router.navigate(['/players'])
            .then(() => console.info('Navigated to players page'));
    }

    goToProfilePage(playerId: string): void {
        this._router.navigate(['/profile', playerId])
            .then(() => console.info(`Navigated to profile page: ${playerId}`));
    }

    goToPlayerTrophySuitePage(trophySuiteId: string, playerId: string): void {
        this._router.navigate(['/trophy-suite', trophySuiteId], {queryParams: {playerId}})
            .then(() => console.info(`Navigated to trophy suite page: ${trophySuiteId} for player ${playerId}`));
    }

    goToTrophySuitePage(trophySuiteId: string): void {
        this._router.navigate(['/trophy-suite', trophySuiteId])
            .then(() => console.info(`Navigated to trophy suite page: ${trophySuiteId}`));
    }
}
