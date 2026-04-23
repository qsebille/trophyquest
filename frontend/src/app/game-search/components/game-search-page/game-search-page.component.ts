import {Component, inject} from '@angular/core';
import {GameCoverStoreService} from '../../../core/stores/game-cover-store.service';
import {GameSearchService} from '../../services/game-search.service';
import {SpinnerContainerComponent} from '../../../core/components/spinner-container/spinner-container.component';
import {GameSearchListComponent} from '../game-search-list/game-search-list.component';

@Component({
  imports: [
    SpinnerContainerComponent,
    GameSearchListComponent
  ],
  templateUrl: './game-search-page.component.html',
  styleUrl: './game-search-page.component.scss',
})
export class GameSearchPageComponent {
  private readonly gameCoverStoreService = inject(GameCoverStoreService);
  private readonly gameSearchService = inject(GameSearchService);

  readonly games = this.gameSearchService.games;
  readonly totalGames = this.gameSearchService.total;
  readonly isLoading = this.gameSearchService.isLoading;

  ngOnInit(): void {
    this.gameCoverStoreService.refreshTopPlayedGame();
    this.gameSearchService.reset();
    this.gameSearchService.searchAndAppend();
  }

  loadMore(): void {
    this.gameSearchService.loadMore();
  }

  onSearchTermChanges(searchTerm: string): void {
    this.gameSearchService.reset();
    this.gameSearchService.updateSearchTerm(searchTerm);
    this.gameSearchService.searchAndAppend();
  }
}
