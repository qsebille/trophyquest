import {inject, Injectable} from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class NavigatorService {
  private readonly router: Router = inject(Router);

  goToHomePage(): void {
    this.router.navigate(['/']).then(() => console.info('Navigated to home page'));
  }

  goToErrorPage(): void {
    this.router.navigate(['/error']).then(() => console.info('Navigated to error page'));
  }

  goToPlayersPage(): void {
    this.router.navigate(['/players'])
      .then(() => console.info('Navigated to players page'));
  }

  goToProfilePage(playerId: string): void {
    this.router.navigate(['/profile', playerId])
      .then(() => console.info(`Navigated to profile page: ${playerId}`));
  }

  goToGamePage(gameId: string): void {
    this.router.navigate(['/game', gameId])
      .then(() => console.info(`Navigated to game page with id: ${gameId}`));
  }

  goToTrophySuitePage(trophySuiteId: string, gameId: string, playerId: string): void {
    console.log(`TrophySuiteId: ${trophySuiteId}, GameId: ${gameId}, PlayerId: ${playerId}`)
    this.router.navigate(['/game', gameId], {queryParams: {trophySuiteId, playerId, tab: 'trophies'}})
      .then(() => console.info(`Navigated to trophy suite page with id: ${trophySuiteId}`));
  }
}
