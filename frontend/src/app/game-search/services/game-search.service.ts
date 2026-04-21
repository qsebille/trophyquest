import {computed, inject, Injectable, signal} from '@angular/core';
import {GameApiService} from '../../core/api/services/game-api.service';
import {GameSearchItem} from '../../core/api/dtos/game/game-search-item';
import {LoadingStatus} from '../../core/models/loading-status.enum';
import {Page} from '../../core/api/dtos/page';

@Injectable({
  providedIn: 'root',
})
export class GameSearchService {
  private readonly gameApiService = inject(GameApiService);

  private readonly pageSize = 50
  private readonly searchTerm = signal<string>('');
  private readonly _currentPage = signal<number>(0);
  private readonly _games = signal<Page<GameSearchItem> | null>(null);
  private readonly _status = signal<LoadingStatus>(LoadingStatus.NONE);
  private readonly _total = signal<number>(0);

  readonly currentPage = this._currentPage.asReadonly();
  readonly loadStatus = this._status.asReadonly();
  readonly games = computed(() => this._games()?.content ?? []);
  readonly total = this._total.asReadonly();

  reset(): void {
    this.searchTerm.set('');
    this._currentPage.set(0);
    this._games.set(null);
    this._status.set(LoadingStatus.NONE);
    this._total.set(0);
  }

  searchAndAppend(pageNumber: number = this.currentPage()): void {
    if (this.loadStatus() === LoadingStatus.LOADING) return;
    this._status.set(LoadingStatus.LOADING);

    this._currentPage.set(pageNumber);
    this.gameApiService.search(this.searchTerm(), pageNumber, this.pageSize).subscribe({
      next: searchResult => {
        const currentGamesContent = this.games();
        searchResult.content = [...currentGamesContent, ...searchResult.content];
        this._games.set(searchResult);
        this._currentPage.set(pageNumber);
        this._status.set(LoadingStatus.FULLY_LOADED);
        this._total.set(searchResult.totalElements);
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
