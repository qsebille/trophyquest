import {Component, inject} from '@angular/core';
import {BackgroundImageService} from '../../core/stores/background-image.service';
import {SpinnerContainerComponent} from '../../core/components/spinner-container/spinner-container.component';
import {GameSearchListComponent} from '../components/game-search-list/game-search-list.component';
import {GameSearchDataService} from '../services/game-search-data.service';

@Component({
    imports: [
        SpinnerContainerComponent,
        GameSearchListComponent
    ],
    providers: [GameSearchDataService],
    templateUrl: './game-search-page.component.html',
    styleUrl: './game-search-page.component.scss',
})
export class GameSearchPageComponent {
    private readonly backgroundImageService = inject(BackgroundImageService);
    private readonly dataService = inject(GameSearchDataService);

    readonly games = this.dataService.games;
    readonly isLoading = this.dataService.isLoading;
    readonly loadingError = this.dataService.isError;
    readonly hasMoreGames = this.dataService.hasMore;

    ngOnInit(): void {
        this.backgroundImageService.useTopPlayedGame();
        this.dataService.init();
    }

    ngOnDestroy(): void {
        this.dataService.reset();
    }

    loadMore(): void {
        this.dataService.loadMore();
    }

    onSearchTermChanges(searchTerm: string): void {
        this.dataService.search(searchTerm);
    }
}
