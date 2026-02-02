import {Component, computed, input} from '@angular/core';
import {BlockComponent} from "../../../core/components/trophyquest-block/block.component";
import {BlockContentTemplate, BlockHeaderTemplate} from "../../../core/templates/block.template";
import {ErrorMessageComponent} from "../../../core/components/error-message/error-message.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {RecentGame} from "../../../core/api/dtos/game/recent-game";
import {LoadingStatus} from "../../../core/models/loading-status.enum";
import {HomeGameCardComponent} from "../home-game-card/home-game-card.component";
import {SpinnerContainerComponent} from "../../../core/components/spinner-container/spinner-container.component";

@Component({
    selector: 'tq-home-games',
    imports: [
        BlockComponent,
        BlockContentTemplate,
        BlockHeaderTemplate,
        ErrorMessageComponent,
        MatProgressSpinnerModule,
        HomeGameCardComponent,
        SpinnerContainerComponent
    ],
    templateUrl: './home-games.component.html',
    styleUrl: './home-games.component.scss',
})
export class HomeGamesComponent {
    readonly games = input<RecentGame[]>([]);
    readonly status = input<LoadingStatus>(LoadingStatus.NONE);
    readonly total = input.required<number>();

    readonly isEmpty = computed(() => this.status() === LoadingStatus.FULLY_LOADED && this.total() === 0)
    readonly isLoading = computed(() => this.status() === LoadingStatus.LOADING)
    readonly isError = computed(() => this.status() === LoadingStatus.ERROR)
}
