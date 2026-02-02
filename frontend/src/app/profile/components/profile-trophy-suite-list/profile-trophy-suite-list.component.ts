import {Component, computed, input, output} from '@angular/core';
import {LoadingStatus} from "../../../core/models/loading-status.enum";
import {BlockComponent} from "../../../core/components/trophyquest-block/block.component";
import {BlockContentTemplate, BlockHeaderTemplate} from "../../../core/templates/block.template";
import {ProfileTrophySuiteCardComponent} from "../profile-trophy-suite-card/profile-trophy-suite-card.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {ErrorMessageComponent} from "../../../core/components/error-message/error-message.component";
import {PlayedTrophySuiteSearchElement} from "../../../core/api/dtos/trophy-suite/played-trophy-suite-search-element";
import {SpinnerContainerComponent} from "../../../core/components/spinner-container/spinner-container.component";

@Component({
    selector: 'tq-profile-trophy-suite-list',
    imports: [
        BlockComponent,
        BlockContentTemplate,
        BlockHeaderTemplate,
        MatProgressSpinnerModule,
        ProfileTrophySuiteCardComponent,
        ErrorMessageComponent,
        SpinnerContainerComponent
    ],
    templateUrl: './profile-trophy-suite-list.component.html',
    styleUrl: './profile-trophy-suite-list.component.scss',
})
export class ProfileTrophySuiteListComponent {
    readonly trophySuites = input<PlayedTrophySuiteSearchElement[]>([]);
    readonly status = input<LoadingStatus>(LoadingStatus.NONE);

    readonly clickOnGame = output<string>();
    readonly loadMoreGames = output();

    readonly isLoading = computed(() => this.status() === LoadingStatus.LOADING);
    readonly isError = computed(() => this.status() === LoadingStatus.ERROR);
    readonly hasMoreGamesToLoad = computed(() => this.status() === LoadingStatus.PARTIALLY_LOADED);
}
