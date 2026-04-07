import {Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {LoadingStatus} from '../../core/models/loading-status.enum';
import {emptyGamePageData, GamePageData} from '../models/game-page-data';
import {GameApiService} from '../../core/api/services/game-api.service';

@Injectable({
  providedIn: 'root',
})
export class GamePageStoreService {
  private readonly _status: WritableSignal<LoadingStatus> = signal<LoadingStatus>(LoadingStatus.NONE);
  private readonly _data: WritableSignal<GamePageData> = signal<GamePageData>(emptyGamePageData);

  readonly status: Signal<LoadingStatus> = this._status.asReadonly();
  readonly data: Signal<GamePageData> = this._data.asReadonly();

  constructor(private _gameApiService: GameApiService) {
  }

  reset(): void {
    this._status.set(LoadingStatus.NONE);
    this._data.set(emptyGamePageData);
  }

  fetch(gameId: string): void {
    this._status.set(LoadingStatus.LOADING);
    this._gameApiService.fetchDetails(gameId).subscribe({
      next: (details) => {
        this._status.set(LoadingStatus.FULLY_LOADED);
        this._data.set({...this._data(), details: details});
      },
      error: (err) => {
        this._status.set(LoadingStatus.ERROR);
        console.error('Failed to fetch game details', err);
      }
    });
  }

}
