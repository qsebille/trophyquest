import {Injectable, Signal, signal} from '@angular/core';
import {GameApiService} from '../../core/api/services/game-api.service';
import {forkJoin, Subject, switchMap} from 'rxjs';
import {emptyGameDetails, GameDetails} from '../../core/api/dtos/game/game-details';
import {TrophySuiteApiService} from '../../core/api/services/trophy-suite-api.service';
import {EarnedTrophy} from '../../core/api/dtos/trophy/earned-trophy';
import {TrophySuiteWithCounts} from '../../core/api/dtos/trophy-suite/trophy-suite-with-counts';

@Injectable({
  providedIn: 'root',
})
export class GamePageStoreService {
  private readonly _gameDetails = signal<GameDetails>(emptyGameDetails);
  private readonly _trophySuites = signal<TrophySuiteWithCounts[]>([]);
  private readonly _trophies = signal<EarnedTrophy[]>([]);
  private readonly _trophySuiteIdSubject = new Subject<string | null>();

  readonly gameDetails: Signal<GameDetails> = this._gameDetails.asReadonly();
  readonly trophySuites: Signal<TrophySuiteWithCounts[]> = this._trophySuites.asReadonly();
  readonly trophies: Signal<EarnedTrophy[]> = this._trophies.asReadonly();

  constructor(private _gameApiService: GameApiService,
              private _trophySuiteApiService: TrophySuiteApiService,) {
    this._trophySuiteIdSubject.pipe(
      switchMap(trophySuiteId => {
        if (trophySuiteId == null) {
          this._trophies.set([]);
          return [];
        }
        return this._trophySuiteApiService.fetchTrophies(trophySuiteId, null);
      })
    ).subscribe({
      next: trophies => {
        this._trophies.set(trophies);
      },
      error: (err) => {
        console.error('Failed to fetch trophies', err);
      }
    });
  }

  reset(): void {
    this._gameDetails.set(emptyGameDetails);
    this._trophySuites.set([]);
    this._trophies.set([]);
  }

  fetch(gameId: string): void {
    forkJoin({
        details: this._gameApiService.fetchDetails(gameId),
        trophySuites: this._gameApiService.fetchTrophySuites(gameId)
      }
    ).subscribe({
      next: ({details, trophySuites}) => {
        this._gameDetails.set(details);
        this._trophySuites.set(trophySuites);
      },
      error: (err) => {
        console.error('Failed to fetch game details', err);
      }
    });
  }

  fetchTrophies(trophySuiteId: string | null): void {
    this._trophySuiteIdSubject.next(trophySuiteId);
  }
}
