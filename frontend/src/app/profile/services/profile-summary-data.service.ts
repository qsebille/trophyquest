import {computed, inject, Injectable, signal} from '@angular/core';
import {PlayerApiService} from '../../core/api/services/player-api.service';
import {NotificationService} from '../../core/services/notification.service';
import {emptyPlayerSearchItem, PlayerSearchItem} from '../../core/api/dtos/player/player-search-item';
import {catchError, EMPTY, finalize, Subject, switchMap, tap} from 'rxjs';

@Injectable()
export class ProfileSummaryDataService {
  private readonly playerApiService = inject(PlayerApiService);
  private readonly notificationService = inject(NotificationService);

  private readonly retrieveSubject = new Subject<string | null>();
  private readonly _data = signal<PlayerSearchItem | null>(null);
  private readonly _isLoading = signal<boolean>(false);
  private readonly _isError = signal<boolean>(false);

  readonly data = computed(() => this._data() ?? emptyPlayerSearchItem);
  readonly isLoading = this._isLoading.asReadonly();
  readonly isError = this._isError.asReadonly();

  constructor() {
    this.retrieveSubject
      .pipe(
        switchMap(playerId => {
          if (playerId === null) return EMPTY;
          this._isLoading.set(true);
          this._isError.set(false);

          return this.playerApiService.fetch(playerId).pipe(
            catchError(err => {
              console.error('Failed to retrieve player profile', err);
              this._isError.set(true);
              this.notificationService.error('Failed to retrieve player profile');
              return EMPTY;
            }),
            finalize(() => this._isLoading.set(false))
          );
        }),
        tap(data => this._data.set(data))
      )
      .subscribe();
  }

  reset(): void {
    this._data.set(null);
    this._isLoading.set(false);
    this._isError.set(false);
  }

  retrieve(playerId: string | null): void {
    this.retrieveSubject.next(playerId);
  }
}
