import {computed, inject, Injectable, signal} from '@angular/core';
import {GameApiService} from '../../core/api/services/game-api.service';
import {GameSearchItem} from '../../core/api/dtos/game/game-search-item';
import {Pagination} from '../../core/api/dtos/pagination';
import {NotificationService} from '../../core/services/notification.service';
import {finalize, map} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameSearchService {
  private readonly gameApiService = inject(GameApiService);
  private readonly notificationService = inject(NotificationService);

  private readonly pageSize = 50;
  private readonly searchTerm = signal<string>('');
  private readonly _games = signal<Pagination<GameSearchItem> | null>(null);
  private readonly _isLoading = signal<boolean>(false);
  private readonly currentPage = computed(() => this._games()?.page ?? 0);

  readonly isLoading = this._isLoading.asReadonly();
  readonly games = computed(() => this._games()?.content ?? []);
  readonly total = computed(() => this._games()?.total ?? 0);

  reset(): void {
    this.searchTerm.set('');
    this._games.set(null);
    this._isLoading.set(false);
  }

  searchAndAppend(page: number = this.currentPage()): void {
    if (this.isLoading()) return;
    this._isLoading.set(true);

    this.gameApiService.search(this.searchTerm(), page, this.pageSize)
      .pipe(
        map(pagination => {
          const content = [...this.games(), ...pagination.content]
          return {...pagination, content} as Pagination<GameSearchItem>
        }),
        finalize(() => this._isLoading.set(false))
      )
      .subscribe({
        next: pagination => this._games.set(pagination),
        error: error => {
          this.notificationService.error('Failed to retrieve game list');
          console.error('Failed to retrieve games', error);
        }
      });
  }

  loadMore(): void {
    this.searchAndAppend(this.currentPage() + 1);
  }

  updateSearchTerm(term: string): void {
    this.searchTerm.set(term);
  }
}
