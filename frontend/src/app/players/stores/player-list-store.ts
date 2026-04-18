import {inject, Injectable, signal} from '@angular/core';
import {PlayerApiService} from '../../core/api/services/player-api.service';
import {LoadingStatus} from '../../core/models/loading-status.enum';
import {PlayerSearchItem} from "../../core/api/dtos/player/player-search-item";
import {catchError, EMPTY, switchMap, tap} from "rxjs";
import {AddPlayerStatus} from "../../core/models/add-player-status.enum";
import {Player} from "../../core/api/dtos/player/player";
import {PlayerAddResponse} from "../../core/api/dtos/player/player-add-response";

@Injectable({
  providedIn: 'root',
})
export class PlayerListStore {
  private readonly playerApiService: PlayerApiService = inject(PlayerApiService);
  private readonly pageSize = 20;
  private pageNumber = 0;
  private readonly _results = signal<PlayerSearchItem[]>([]);
  private readonly _total = signal<number>(0);
  private readonly _status = signal<LoadingStatus>(LoadingStatus.NONE);
  private readonly _addStatus = signal<AddPlayerStatus>(AddPlayerStatus.NONE);

  readonly results = this._results.asReadonly();
  readonly total = this._total.asReadonly();
  readonly status = this._status.asReadonly();
  readonly addStatus = this._addStatus.asReadonly();

  resetSearch(): void {
    this.pageNumber = 0;
    this._results.set([]);
    this._total.set(0);
    this._status.set(LoadingStatus.NONE);
  }

  resetAddPlayerStatus(): void {
    this._addStatus.set(AddPlayerStatus.NONE);
  }

  search(): void {
    this._status.set(LoadingStatus.LOADING);

    console.debug('Searching players...');
    this.playerApiService.search(this.pageNumber, this.pageSize).subscribe({
      next: searchResult => {
        const players = [...this.results(), ...searchResult.content];
        const loadingStatus: LoadingStatus = players.length < searchResult.total ? LoadingStatus.PARTIALLY_LOADED : LoadingStatus.FULLY_LOADED;
        this._results.update(() => players);
        this._total.set(searchResult.total);
        this._status.set(loadingStatus);
      },
      error: error => {
        this._status.set(LoadingStatus.ERROR);
        console.error(error)
      },
    });
  }

  loadMore(): void {
    this.pageNumber = this.pageNumber + 1;
    this.search();
  }

  addPlayer(pseudo: string): void {
    this._addStatus.set(AddPlayerStatus.LOADING);

    this.playerApiService.fetchByPseudo(pseudo).pipe(
      switchMap((response: Player | null) => {
        if (response === null) {
          console.info("Player not found in database, adding it to database...");
          this._addStatus.set(AddPlayerStatus.LOADING);
          return this.playerApiService.addPlayer(pseudo);
        } else {
          console.info("Player already in database, not adding it to database");
          this._addStatus.set(AddPlayerStatus.ALREADY_IN_DATABASE);
          return EMPTY;
        }
      }),
      tap((lambdaResponse: PlayerAddResponse) => {
        switch (lambdaResponse.status) {
          case 'OK':
            this._addStatus.set(AddPlayerStatus.ADDED);
            this.resetSearch();
            this.search();
            break;
          case 'ERROR':
            this._addStatus.set(AddPlayerStatus.ERROR_WHEN_ADDING);
        }
      }),
      catchError(() => {
        this._addStatus.set(AddPlayerStatus.ERROR_WHEN_ADDING);
        return EMPTY;
      })
    ).subscribe();
  }
}
