import {Component, computed, input, output} from '@angular/core';
import {TopRecentPlayerRow} from "../../../core/api/dtos/player/top-recent-player-row";
import {LoadingStatus} from "../../../core/models/loading-status.enum";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {ErrorMessageComponent} from "../../../core/components/error-message/error-message.component";
import {HomePlayerCardComponent} from "../home-player-card/home-player-card.component";
import {HomeTrophyCardComponent} from "../home-trophy-card/home-trophy-card.component";
import {SpinnerContainerComponent} from "../../../core/components/spinner-container/spinner-container.component";

@Component({
    selector: 'tq-home-player-list',
    imports: [
        MatProgressSpinnerModule,
        ErrorMessageComponent,
        HomePlayerCardComponent,
        HomeTrophyCardComponent,
        SpinnerContainerComponent,

    ],
    templateUrl: './home-player-list.component.html',
    styleUrl: './home-player-list.component.scss',
})
export class HomePlayerListComponent {
    readonly players = input<TopRecentPlayerRow[]>([]);
    readonly status = input<LoadingStatus>(LoadingStatus.NONE);

    readonly clickOnPlayer = output<string>();
    readonly clickOnGame = output<{ trophySuiteId: string, playerId: string }>();

    readonly isLoadingPlayers = computed(() => this.status() === LoadingStatus.LOADING);
    readonly hasFailedLoadingPlayers = computed(() => this.status() === LoadingStatus.ERROR);
    readonly hasNoRecentPlayers = computed(() => this.players().length == 0 && this.status() === LoadingStatus.FULLY_LOADED);
}
