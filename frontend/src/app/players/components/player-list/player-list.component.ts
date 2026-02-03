import {Component, computed, input, output} from '@angular/core';
import {ErrorMessageComponent} from "../../../core/components/error-message/error-message.component";
import {LoadingStatus} from "../../../core/models/loading-status.enum";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {PlayerCardComponent} from "../player-card/player-card.component";
import {PlayerSearchItem} from "../../../core/api/dtos/player/player-search-item";
import {SpinnerContainerComponent} from "../../../core/components/spinner-container/spinner-container.component";
import {BlockComponent} from "../../../core/components/trophyquest-block/block.component";
import {BlockContentTemplate, BlockHeaderTemplate} from "../../../core/templates/block.template";

@Component({
    selector: 'tq-player-list',
    imports: [
        ErrorMessageComponent,
        MatProgressSpinnerModule,
        PlayerCardComponent,
        SpinnerContainerComponent,
        BlockComponent,
        BlockContentTemplate,
        BlockHeaderTemplate
    ],
    templateUrl: './player-list.component.html',
    styleUrl: './player-list.component.scss',
})
export class PlayerListComponent {
    readonly players = input<PlayerSearchItem[]>([]);
    readonly total = input<number>(0);
    readonly status = input<LoadingStatus>(LoadingStatus.NONE);

    readonly retrievePlayers = output<void>();
    readonly loadMorePlayers = output<void>();
    readonly clickOnPlayer = output<string>();
    readonly clickOnGame = output<{ gameId: string, playerId: string }>();

    readonly isLoading = computed(() => this.status() === LoadingStatus.LOADING);
    readonly isError = computed(() => this.status() === LoadingStatus.ERROR);
    readonly hasMorePlayersToLoad = computed(() => this.status() === LoadingStatus.PARTIALLY_LOADED);
}
