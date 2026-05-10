import {computed, inject, Injectable, signal} from '@angular/core';
import {GameApiService} from '../../core/api/services/game-api.service';
import {TrophySuiteApiService} from '../../core/api/services/trophy-suite-api.service';
import {emptyGameDetails, GameDetails} from '../../core/api/dtos/game/game-details';
import {TrophySuite} from '../../core/api/dtos/trophy-suite/trophy-suite';
import {Trophy} from '../../core/api/dtos/trophy/trophy';
import {Pagination} from '../../core/api/dtos/pagination';
import {GamePlayer} from '../../core/api/dtos/player/game-player';
import {catchError, forkJoin, of, Subject, switchMap, tap} from 'rxjs';
import {NotificationService} from '../../core/services/notification.service';

@Injectable()
export class GameDataService {
  private readonly gameApiService = inject(GameApiService);
  private readonly trophySuiteApiService = inject(TrophySuiteApiService);
  private readonly notificationService = inject(NotificationService)

  private readonly playersPageSize = 20;
  private readonly fetchTrophiesSubject = new Subject<{ trophySuiteId: string | null, playerId: string | null }>();
  private readonly _gameDetails = signal<GameDetails>(emptyGameDetails);
  private readonly _trophySuites = signal<TrophySuite[]>([]);
  private readonly _trophies = signal<Trophy[]>([]);
  private readonly _playersPagination = signal<Pagination<GamePlayer> | null>(null);
  private readonly _isError = signal<boolean>(false);

  readonly gameDetails = this._gameDetails.asReadonly();
  readonly trophySuites = this._trophySuites.asReadonly();
  readonly trophies = this._trophies.asReadonly();
  readonly playersPagination = computed(() => {
    return {
      content: this._playersPagination()?.content ?? [],
      page: this._playersPagination()?.page ?? 0,
      total: this._playersPagination()?.total ?? 0,
      size: this._playersPagination()?.size ?? this.playersPageSize
    };
  });
  readonly isError = this._isError.asReadonly();

  constructor() {
    this.fetchTrophiesSubject.pipe(
      switchMap(({trophySuiteId, playerId}) => {
        if (trophySuiteId == null) return of([] as Trophy[]);
        return this.trophySuiteApiService.fetchTrophies(trophySuiteId, playerId)
          .pipe(
            tap(trophies => this._trophies.set(trophies)),
            catchError(err => {
              console.error('Failed to fetch trophies', err);
              this.notificationService.error('Failed to fetch trophies');
              this._isError.set(true);
              return of([] as Trophy[]);
            })
          );
      })
    ).subscribe();
  }

  reset(): void {
    this._gameDetails.set(emptyGameDetails);
    this._trophySuites.set([]);
    this._trophies.set([]);
    this._playersPagination.set(null);
  }

  fetchDetails(gameId: string): void {
    forkJoin({
        details: this.gameApiService.fetchDetails(gameId),
        trophySuites: this.gameApiService.fetchTrophySuites(gameId),
      }
    ).subscribe({
      next: ({details, trophySuites}) => {
        this._gameDetails.set(details);
        this._trophySuites.set(trophySuites);
      },
      error: (err) => {
        console.error('Failed to fetch game details and trophy suites', err);
        this._isError.set(true);
      }
    });
  }

  fetchPlayers(gameId: string, page: number): void {
    this.gameApiService.fetchPlayers(gameId, page, this.playersPageSize).subscribe({
      next: playersPagination => this._playersPagination.set(playersPagination),
      error: (err) => {
        console.error('Failed to fetch players', err);
        this._isError.set(true);
      }
    });
  }

  fetchTrophies(trophySuiteId: string | null, playerId: string | null): void {
    const subjectData = {trophySuiteId, playerId};
    this.fetchTrophiesSubject.next(subjectData);
  }
}
