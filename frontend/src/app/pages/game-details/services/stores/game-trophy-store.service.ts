import {inject, Injectable, signal} from '@angular/core';
import {NotificationService} from '../../../../core/services/notification.service';
import {catchError, EMPTY, Subject, switchMap, tap} from 'rxjs';
import {GameDetailsApiService} from '../game-details-api.service';
import {GameTrophyItem} from '../../models/game-trophy-item';

@Injectable()
export class GameTrophyStoreService {
  private readonly gameDetailsApiService = inject(GameDetailsApiService);
  private readonly notificationService = inject(NotificationService);

  private readonly fetchTrophiesSubject = new Subject<{ suiteId: string | null, playerId: string | null }>();
  private readonly _trophies = signal<GameTrophyItem[]>([]);
  private readonly _hasError = signal<boolean>(false);

  readonly trophies = this._trophies.asReadonly();
  readonly hasError = this._hasError.asReadonly();

  constructor() {
    this.fetchTrophiesSubject.pipe(
      switchMap(({suiteId, playerId}) => {
        this._hasError.set(false);
        if (suiteId == null) return EMPTY;
        return this.gameDetailsApiService.fetchTrophiesBySuiteId(suiteId, playerId)
          .pipe(
            tap(trophies => this._trophies.set(trophies)),
            catchError(err => {
              console.error('Failed to fetch trophies', err);
              this.notificationService.error('Failed to fetch trophies');
              this._hasError.set(true);
              return EMPTY;
            })
          );
      })
    ).subscribe();
  }

  reset(): void {
    this._trophies.set([]);
    this._hasError.set(false);
  }

  fetchTrophies(suiteId: string | null, playerId: string | null): void {
    const subjectData = {suiteId, playerId};
    this.fetchTrophiesSubject.next(subjectData);
  }
}
