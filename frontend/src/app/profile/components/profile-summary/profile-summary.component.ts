import {Component, computed, input, output} from '@angular/core';
import {
    TrophyCountDisplayerComponent
} from '../../../core/components/trophy-count-displayer/trophy-count-displayer.component';
import {DecimalPipe, NgOptimizedImage} from '@angular/common';
import {Player} from '../../../core/api/dtos/player/player';
import {TrophyCountPerType} from '../../../core/models/dto/trophy-count-per-type';
import {BlockComponent} from "../../../core/components/trophyquest-block/block.component";
import {BlockContentTemplate, BlockHeaderTemplate} from "../../../core/templates/block.template";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {LoadingStatus} from "../../../core/models/loading-status.enum";
import {PlayerStats} from "../../../core/api/dtos/player/player-stats";
import {SpinnerContainerComponent} from "../../../core/components/spinner-container/spinner-container.component";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";

@Component({
    selector: 'tq-profile-summary',
    imports: [
        TrophyCountDisplayerComponent,
        NgOptimizedImage,
        DecimalPipe,
        BlockComponent,
        BlockContentTemplate,
        BlockHeaderTemplate,
        MatProgressSpinnerModule,
        SpinnerContainerComponent,
        MatIconModule,
        MatButtonModule,
    ],
    templateUrl: './profile-summary.component.html',
    styleUrl: './profile-summary.component.scss',
})
export class ProfileSummaryComponent {
    readonly player = input.required<Player>();
    readonly playerStats = input.required<PlayerStats>();
    readonly status = input<LoadingStatus>(LoadingStatus.NONE);
    readonly deletePlayer = output();

    readonly isLoading = computed(() => this.status() === LoadingStatus.LOADING);

    readonly trophyCountPerType = computed(() =>
        ({
            platinum: this.playerStats().totalPlatinumTrophies,
            gold: this.playerStats().totalGoldTrophies,
            silver: this.playerStats().totalSilverTrophies,
            bronze: this.playerStats().totalBronzeTrophies
        } as TrophyCountPerType));
    readonly totalEarnedTrophies = computed(() => this.trophyCountPerType().platinum + this.trophyCountPerType().gold + this.trophyCountPerType().silver + this.trophyCountPerType().bronze);

}
