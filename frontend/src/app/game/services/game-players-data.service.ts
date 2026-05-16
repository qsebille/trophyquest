import {computed, inject, Injectable, signal} from '@angular/core';
import {GameApiService} from '../../core/api/services/game-api.service';
import {NotificationService} from '../../core/services/notification.service';
import {Pagination} from '../../core/api/dtos/pagination';
import {GamePlayer} from '../../core/api/dtos/player/game-player';
import {catchError, EMPTY, finalize, Subject, switchMap, tap} from 'rxjs';

@Injectable()
export class GamePlayersDataService {
  private readonly gameApiService = inject(GameApiService);
  private readonly notificationService = inject(NotificationService);

  private readonly playersPageSubject = new Subject<{ gameId: string, page: number }>();
  private readonly playersPageSize = 20;
  private readonly _playersPagination = signal<Pagination<GamePlayer> | null>(null);
  private readonly _hasError = signal<boolean>(false);
  private readonly _isLoading = signal<boolean>(false);

  readonly playersPagination = computed(() => {
    return {
      content: this._playersPagination()?.content ?? [],
      page: this._playersPagination()?.page ?? 0,
      total: this._playersPagination()?.total ?? 0,
      size: this._playersPagination()?.size ?? this.playersPageSize
    } as Pagination<GamePlayer>;
  });
  readonly hasError = this._hasError.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();

  constructor() {
    this.playersPageSubject.pipe(
      switchMap(({gameId, page}) => {
        this._isLoading.set(true);
        return this.gameApiService.fetchPlayers(gameId, page, this.playersPageSize)
          .pipe(
            tap(playersPagination => this._playersPagination.set(playersPagination)),
            catchError(err => {
              console.error('Failed to fetch players', err);
              this.notificationService.error('Failed to fetch players');
              this._playersPagination.set(null);
              this._hasError.set(true);
              return EMPTY;
            }),
            finalize(() => this._isLoading.set(false))
          )
      })
    ).subscribe();
  }

  reset(): void {
    this._playersPagination.set(null);
    this._hasError.set(false);
  }

  fetch(gameId: string, page: number): void {
    this.playersPageSubject.next({gameId, page});
  }
}
