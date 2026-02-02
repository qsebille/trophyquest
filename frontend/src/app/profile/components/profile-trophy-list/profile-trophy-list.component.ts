import {Component, computed, input, output} from '@angular/core';
import {BlockComponent} from "../../../core/components/trophyquest-block/block.component";
import {BlockContentTemplate, BlockHeaderTemplate} from "../../../core/templates/block.template";
import {ProfileTrophyCardComponent} from "../profile-trophy-card/profile-trophy-card.component";
import {LoadingStatus} from "../../../core/models/loading-status.enum";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {EarnedTrophySearchItem} from "../../../core/api/dtos/trophy/earned-trophy-search-item";
import {ErrorMessageComponent} from "../../../core/components/error-message/error-message.component";
import {SpinnerContainerComponent} from "../../../core/components/spinner-container/spinner-container.component";

@Component({
    selector: 'tq-profile-trophy-list',
    imports: [
        BlockComponent,
        BlockContentTemplate,
        BlockHeaderTemplate,
        MatProgressSpinnerModule,
        ProfileTrophyCardComponent,
        ErrorMessageComponent,
        SpinnerContainerComponent
    ],
    templateUrl: './profile-trophy-list.component.html',
    styleUrl: './profile-trophy-list.component.scss',
})
export class ProfileTrophyListComponent {
    readonly trophies = input<EarnedTrophySearchItem[]>([]);
    readonly status = input<LoadingStatus>(LoadingStatus.NONE);

    readonly loadMoreTrophies = output();

    readonly isLoading = computed(() => this.status() === LoadingStatus.LOADING);
    readonly isError = computed(() => this.status() === LoadingStatus.ERROR);
    readonly hasMoreTrophiesToLoad = computed(() => this.status() === LoadingStatus.PARTIALLY_LOADED);
}
