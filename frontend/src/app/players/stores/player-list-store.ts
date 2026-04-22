import {computed, inject, Injectable, signal} from '@angular/core';
import {PlayerApiService} from '../../core/api/services/player-api.service';
import {LoadingStatus} from '../../core/models/loading-status.enum';
import {PlayerSearchItem} from "../../core/api/dtos/player/player-search-item";
import {map, of, switchMap} from "rxjs";
import {AddPlayerStatus} from "../../core/models/add-player-status.enum";
import {Pagination} from '../../core/api/dtos/pagination';

@Injectable({
  providedIn: 'root',
})
export class PlayerListStore {
  private readonly playerApiService: PlayerApiService = inject(PlayerApiService);
  private readonly pageSize = 20;

  private readonly pagination = signal<Pagination<PlayerSearchItem> | null>(null);
  private readonly currentPage = computed(() => this.pagination()?.page ?? 0);
  private readonly _status = signal<LoadingStatus>(LoadingStatus.NONE);
  private readonly _addStatus = signal<AddPlayerStatus>(AddPlayerStatus.NONE);

  readonly players = computed(() => this.pagination()?.content ?? []);
  readonly total = computed(() => this.pagination()?.total ?? 0);
  readonly status = this._status.asReadonly();
  readonly addStatus = this._addStatus.asReadonly();

  resetSearch(): void {
    this._status.set(LoadingStatus.NONE);
    this.pagination.set(null);
  }

  resetAddPlayerStatus(): void {
    this._addStatus.set(AddPlayerStatus.NONE);
  }

  search(page: number = this.currentPage()): void {
    if (this._status() === LoadingStatus.LOADING) return;
    this._status.set(LoadingStatus.LOADING);

    this.playerApiService.search(page, this.pageSize)
      .pipe(
        map(pagination => {
          const content = [...this.players(), ...pagination.content];
          return {...pagination, content} as Pagination<PlayerSearchItem>;
        })
      )
      .subscribe({
        next: pagination => {
          const loadingStatus: LoadingStatus = pagination.content.length < pagination.total ?
            LoadingStatus.PARTIALLY_LOADED :
            LoadingStatus.FULLY_LOADED;
          this.pagination.set(pagination);
          this._status.set(loadingStatus);
        },
        error: error => {
          this._status.set(LoadingStatus.ERROR);
          console.error(error)
        },
      });
  }

  loadMore(): void {
    this.search(this.currentPage() + 1);
  }

  addPlayer(pseudo: string): void {
    this._addStatus.set(AddPlayerStatus.LOADING);

    this.playerApiService.fetchByPseudo(pseudo)
      .pipe(
        switchMap(response => {
          if (response === null) {
            console.info("Player not found in database, adding it to database...");
            this._addStatus.set(AddPlayerStatus.LOADING);
            return this.playerApiService.addPlayer(pseudo);
          } else {
            console.info("Player already in database, not adding it to database");
            this._addStatus.set(AddPlayerStatus.ALREADY_IN_DATABASE);
            return of({status: 'ERROR', message: 'Player already in database'});
          }
        }),
      ).subscribe({
      next: response => {
        switch (response.status) {
          case 'OK':
            this._addStatus.set(AddPlayerStatus.ADDED);
            this.resetSearch();
            this.search();
            break;
          case 'ERROR':
            console.error('Error when adding player: ', response);
            this._addStatus.set(AddPlayerStatus.ERROR_WHEN_ADDING);
        }
      },
      error: error => {
        console.error('Error when adding player: ', error);
        this._addStatus.set(AddPlayerStatus.ERROR_WHEN_ADDING);
      }
    });
  }
}
