import {inject, Injectable, signal} from '@angular/core';
import {GameApiService} from '../../core/api/services/game-api.service';
import {TrophySuiteApiService} from '../../core/api/services/trophy-suite-api.service';
import {NotificationService} from '../../core/services/notification.service';
import {catchError, EMPTY, Subject, switchMap, tap} from 'rxjs';
import {TrophySuite} from '../../core/api/dtos/trophy-suite/trophy-suite';
import {Trophy} from '../../core/api/dtos/trophy/trophy';

@Injectable()
export class GameTrophyDataService {
  private readonly gameApiService = inject(GameApiService);
  private readonly trophySuiteApiService = inject(TrophySuiteApiService);
  private readonly notificationService = inject(NotificationService);

  private readonly fetchTrophiesSubject = new Subject<{ trophySuiteId: string | null, playerId: string | null }>();
  private readonly _trophySuites = signal<TrophySuite[]>([]);
  private readonly _trophies = signal<Trophy[]>([]);
  private readonly _hasErrorInTrophies = signal<boolean>(false);
  private readonly _hasErrorInTrophySuites = signal<boolean>(false);

  readonly trophySuites = this._trophySuites.asReadonly();
  readonly trophies = this._trophies.asReadonly();
  readonly hasErrorInTrophies = this._hasErrorInTrophies.asReadonly();
  readonly hasErrorInTrophySuites = this._hasErrorInTrophySuites.asReadonly();

  constructor() {
    this.fetchTrophiesSubject.pipe(
      switchMap(({trophySuiteId, playerId}) => {
        this._hasErrorInTrophies.set(false);
        if (trophySuiteId == null) return EMPTY;
        return this.trophySuiteApiService.fetchTrophies(trophySuiteId, playerId)
          .pipe(
            tap(trophies => this._trophies.set(trophies)),
            catchError(err => {
              console.error('Failed to fetch trophies', err);
              this.notificationService.error('Failed to fetch trophies');
              this._hasErrorInTrophies.set(true);
              return EMPTY;
            })
          );
      })
    ).subscribe();
  }

  reset(): void {
    this._trophySuites.set([]);
    this._trophies.set([]);
    this._hasErrorInTrophySuites.set(false);
  }

  fetchTrophySuites(gameId: string): void {
    this._hasErrorInTrophySuites.set(false);
    this.gameApiService.fetchTrophySuites(gameId)
      .subscribe({
        next: (trophySuites) => this._trophySuites.set(trophySuites),
        error: (err) => {
          console.error('Failed to fetch trophy suites', err);
          this.notificationService.error('Failed to fetch trophy suites');
          this._hasErrorInTrophySuites.set(true);
        }
      });
  }

  fetchTrophies(trophySuiteId: string | null, playerId: string | null): void {
    const subjectData = {trophySuiteId, playerId};
    this.fetchTrophiesSubject.next(subjectData);
  }
}
