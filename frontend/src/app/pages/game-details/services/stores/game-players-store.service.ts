import {computed, inject, Injectable, signal} from '@angular/core';
import {NotificationService} from '../../../../core/services/notification.service';
import {Pagination} from '../../../../core/api/dtos/pagination';
import {catchError, EMPTY, finalize, Subject, switchMap, tap} from 'rxjs';
import {GameDetailsApiService} from '../game-details-api.service';
import {GamePlayerItem} from '../../models/game-player-item';

@Injectable()
export class GamePlayersStoreService {
  private readonly gameDetailsApiService = inject(GameDetailsApiService);
  private readonly notificationService = inject(NotificationService);

  private readonly playersByGameSubject = new Subject<{ gameId: string, page: number }>();
  private readonly playersBySuiteSubject = new Subject<{ suiteId: string, page: number }>();
  private readonly playersPageSize = 20;
  private readonly _playersPagination = signal<Pagination<GamePlayerItem> | null>(null);
  private readonly _hasError = signal<boolean>(false);
  private readonly _isLoading = signal<boolean>(false);

  readonly playersPagination = computed(() => {
    return {
      content: this._playersPagination()?.content ?? [],
      page: this._playersPagination()?.page ?? 0,
      total: this._playersPagination()?.total ?? 0,
      size: this._playersPagination()?.size ?? this.playersPageSize
    } as Pagination<GamePlayerItem>;
  });
  readonly hasError = this._hasError.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();

  constructor() {
    this.playersByGameSubject.pipe(
      switchMap(({gameId, page}) => {
        this._isLoading.set(true);
        return this.gameDetailsApiService.fetchPlayersByGameId(gameId, page, this.playersPageSize)
          .pipe(
            tap(playersPagination => this._playersPagination.set(playersPagination)),
            catchError(err => {
              console.error('Failed to fetch players for game', err);
              this.notificationService.error('Failed to fetch players');
              this._playersPagination.set(null);
              this._hasError.set(true);
              return EMPTY;
            }),
            finalize(() => this._isLoading.set(false))
          )
      })
    ).subscribe();

    this.playersBySuiteSubject.pipe(
      switchMap(({suiteId, page}) => {
        this._isLoading.set(true);
        return this.gameDetailsApiService.fetchPlayersBySuiteId(suiteId, page, this.playersPageSize)
          .pipe(
            tap(playersPagination => this._playersPagination.set(playersPagination)),
            catchError(err => {
              console.error('Failed to fetch players for suite', err);
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

  fetchForGame(gameId: string, page: number): void {
    this.playersByGameSubject.next({gameId, page});
  }

  fetchForSuite(suiteId: string, page: number): void {
    this.playersBySuiteSubject.next({suiteId, page});
  }
}
