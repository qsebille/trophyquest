import {computed, inject, Injectable, signal} from '@angular/core';
import {GameApiService} from '../../core/api/services/game-api.service';
import {catchError, forkJoin, of, Subject, switchMap} from 'rxjs';
import {emptyGameDetails, GameDetails} from '../../core/api/dtos/game/game-details';
import {TrophySuiteApiService} from '../../core/api/services/trophy-suite-api.service';
import {EarnedTrophy} from '../../core/api/dtos/trophy/earned-trophy';
import {TrophySuiteWithCounts} from '../../core/api/dtos/trophy-suite/trophy-suite-with-counts';
import {GamePlayer} from '../../core/api/dtos/player/game-player';
import {Pagination} from '../../core/api/dtos/pagination';

@Injectable({
  providedIn: 'root',
})
export class GamePageStoreService {
  private readonly gameApiService: GameApiService = inject(GameApiService);
  private readonly trophySuiteApiService: TrophySuiteApiService = inject(TrophySuiteApiService);

  private readonly playersPageSize = 20;
  private readonly _gameDetails = signal<GameDetails>(emptyGameDetails);
  private readonly _trophySuites = signal<TrophySuiteWithCounts[]>([]);
  private readonly _trophies = signal<EarnedTrophy[]>([]);
  private readonly _playersPagination = signal<Pagination<GamePlayer> | null>(null);

  private readonly fetchTrophiesSubject = new Subject<{ trophySuiteId: string | null, playerId: string | null }>();

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

  constructor() {
    this.fetchTrophiesSubject.pipe(
      switchMap(data => {
        if (data.trophySuiteId == null) {
          this._trophies.set([]);
          return [];
        }
        return this.trophySuiteApiService.fetchTrophies(data.trophySuiteId, data.playerId).pipe(
          catchError(err => {
            console.error('Failed to fetch trophies', err);
            return of([]);
          })
        );
      })
    ).subscribe({
      next: trophies => this._trophies.set(trophies)
    });
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
      }
    });
  }

  fetchPlayers(gameId: string, page: number): void {
    this.gameApiService.fetchPlayers(gameId, page, this.playersPageSize).subscribe({
      next: playersPagination => this._playersPagination.set(playersPagination),
      error: (err) => console.error('Failed to fetch players', err)
    });
  }

  fetchTrophies(trophySuiteId: string | null, playerId: string | null): void {
    const subjectData = {trophySuiteId, playerId};
    this.fetchTrophiesSubject.next(subjectData);
  }
}
