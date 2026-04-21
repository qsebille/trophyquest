import {inject, Injectable, Signal, signal} from '@angular/core';
import {GameApiService} from '../../core/api/services/game-api.service';
import {catchError, forkJoin, of, Subject, switchMap} from 'rxjs';
import {emptyGameDetails, GameDetails} from '../../core/api/dtos/game/game-details';
import {TrophySuiteApiService} from '../../core/api/services/trophy-suite-api.service';
import {EarnedTrophy} from '../../core/api/dtos/trophy/earned-trophy';
import {TrophySuiteWithCounts} from '../../core/api/dtos/trophy-suite/trophy-suite-with-counts';
import {GamePlayer} from '../../core/api/dtos/player/game-player';
import {initPagination, Pagination} from '../../core/api/dtos/pagination';

@Injectable({
  providedIn: 'root',
})
export class GamePageStoreService {
  private readonly gameApiService: GameApiService = inject(GameApiService);
  private readonly trophySuiteApiService: TrophySuiteApiService = inject(TrophySuiteApiService);

  private readonly _gameDetails = signal<GameDetails>(emptyGameDetails);
  private readonly _trophySuites = signal<TrophySuiteWithCounts[]>([]);
  private readonly _trophies = signal<EarnedTrophy[]>([]);
  private readonly _playersPagination = signal<Pagination<GamePlayer>>(initPagination(20));

  private readonly trophySuiteIdSubject = new Subject<{ trophySuiteId: string | null, playerId: string | null }>();

  readonly gameDetails: Signal<GameDetails> = this._gameDetails.asReadonly();
  readonly trophySuites: Signal<TrophySuiteWithCounts[]> = this._trophySuites.asReadonly();
  readonly trophies: Signal<EarnedTrophy[]> = this._trophies.asReadonly();
  readonly playersPagination: Signal<Pagination<GamePlayer>> = this._playersPagination.asReadonly();

  constructor() {
    this.trophySuiteIdSubject.pipe(
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
    this._playersPagination.set(initPagination(20));
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
    this.gameApiService.fetchPlayers(gameId, page, this.playersPagination().pageSize).subscribe({
      next: players => {
        this._playersPagination.update(pagination => ({
          ...pagination,
          currentPage: page,
          total: players.total,
          content: players.content,
        }));
      },
      error: (err) => {
        console.error('Failed to fetch players', err);
      }
    })
  }

  fetchTrophies(trophySuiteId: string | null, playerId: string | null): void {
    const subjectData = {trophySuiteId, playerId};
    this.trophySuiteIdSubject.next(subjectData);
  }
}
