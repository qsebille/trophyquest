import {inject, Injectable, signal} from '@angular/core';
import {GameDetailsApiService} from '../game-details-api.service';
import {NotificationService} from '../../../../core/services/notification.service';
import {Subject} from 'rxjs';
import {GameSuiteItem} from '../../models/game-suite-item';

@Injectable({
  providedIn: 'root',
})
export class GameSuiteStoreService {
  private readonly gameDetailsApiService = inject(GameDetailsApiService);
  private readonly notificationService = inject(NotificationService);

  private readonly fetchTrophiesSubject = new Subject<{ trophySuiteId: string | null, playerId: string | null }>();
  private readonly _suites = signal<GameSuiteItem[]>([]);
  private readonly _hasError = signal<boolean>(false);

  readonly suites = this._suites.asReadonly();
  readonly hasError = this._hasError.asReadonly();

  constructor() {
  }

  reset(): void {
    this._suites.set([]);
    this._hasError.set(false);
  }

  fetchSuites(gameId: string): void {
    this._hasError.set(false);
    this.gameDetailsApiService.fetchSuitesByGameId(gameId)
      .subscribe({
        next: (suites) => this._suites.set(suites),
        error: (err) => {
          console.error('Failed to fetch suites', err);
          this.notificationService.error('Failed to fetch suites');
          this._hasError.set(true);
        }
      });
  }
}
