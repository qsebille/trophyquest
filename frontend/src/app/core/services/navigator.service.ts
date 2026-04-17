import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {catchError, from, of, switchMap, take} from 'rxjs';
import {TrophySuiteApiService} from '../api/services/trophy-suite-api.service';

@Injectable({
  providedIn: 'root',
})
export class NavigatorService {

  constructor(
    private _router: Router,
    private _trophySuiteApiService: TrophySuiteApiService,
  ) {
  }

  goToHomePage(): void {
    this._router.navigate(['/']).then(() => console.info('Navigated to home page'));
  }

  goToErrorPage(): void {
    this._router.navigate(['/error']).then(() => console.info('Navigated to error page'));
  }

  goToPlayersPage(): void {
    this._router.navigate(['/players'])
      .then(() => console.info('Navigated to players page'));
  }

  goToProfilePage(playerId: string): void {
    this._router.navigate(['/profile', playerId])
      .then(() => console.info(`Navigated to profile page: ${playerId}`));
  }

  goToGamePage(gameId: string): void {
    this._router.navigate(['/game', gameId])
      .then(() => console.info(`Navigated to game page with id: ${gameId}`));
  }

  goToTrophySuitePage(trophySuiteId: string, playerId: string): void {
    this._trophySuiteApiService.getGameIdByTrophySuiteId(trophySuiteId).pipe(
      switchMap(gameId => {
          console.log(gameId)
          return from(
            this._router.navigate(
              ['/game', gameId.id],
              {queryParams: {trophySuiteId, playerId, tab: 'trophies'}}
            )
          )
        }
      ),
      catchError(error => {
        console.error('Impossible to navigate to trophy suite page', error);
        return of(false);
      }),
      take(1)
    ).subscribe();
  }
}
