import {computed, inject, Injectable, signal} from '@angular/core';
import {GameApiService} from '../../core/api/services/game-api.service';
import {GameSearchItem} from '../../core/api/dtos/game/game-search-item';
import {LoadingStatus} from '../../core/models/loading-status.enum';
import {Pagination} from '../../core/api/dtos/pagination';

@Injectable({
  providedIn: 'root',
})
export class GameSearchService {
  private readonly gameApiService = inject(GameApiService);

  private readonly pageSize = 50;
  private readonly searchTerm = signal<string>('');
  private readonly _games = signal<Pagination<GameSearchItem> | null>(null);
  private readonly _status = signal<LoadingStatus>(LoadingStatus.NONE);
  private readonly currentPage = computed(() => this._games()?.page ?? 0);

  readonly loadStatus = this._status.asReadonly();
  readonly games = computed(() => this._games()?.content ?? []);
  readonly total = computed(() => this._games()?.total ?? 0);

  reset(): void {
    this.searchTerm.set('');
    this._games.set(null);
    this._status.set(LoadingStatus.NONE);
  }

  searchAndAppend(page: number = this.currentPage()): void {
    if (this.loadStatus() === LoadingStatus.LOADING) return;
    this._status.set(LoadingStatus.LOADING);

    this.gameApiService.search(this.searchTerm(), page, this.pageSize).subscribe({
      next: searchResult => {
        const currentGamesContent = this.games();
        searchResult.content = [...currentGamesContent, ...searchResult.content];
        this._games.set(searchResult);
        this._status.set(LoadingStatus.FULLY_LOADED);
      },
      error: error => {
        console.error('Failed to search games', error);
        this._status.set(LoadingStatus.ERROR);
      }
    })
  }

  loadMore(): void {
    this.searchAndAppend(this.currentPage() + 1);
  }

  updateSearchTerm(term: string): void {
    this.searchTerm.set(term);
  }
}
