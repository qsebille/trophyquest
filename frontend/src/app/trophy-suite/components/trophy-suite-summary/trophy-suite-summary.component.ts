import {Component, computed, input} from '@angular/core';
import {
    TrophyCountDisplayerComponent
} from "../../../core/components/trophy-count-displayer/trophy-count-displayer.component";
import {TrophySuite} from "../../../core/api/dtos/trophy-suite/trophy-suite";
import {EarnedTrophy} from "../../../core/api/dtos/trophy/earned-trophy";
import {TrophyCountPerType} from "../../../core/models/dto/trophy-count-per-type";
import {TrophySuiteGameDetails} from "../../../core/api/dtos/game/trophy-suite-game-details";
import {PlatformLabelComponent} from "../../../core/components/platform-label/platform-label.component";
import {NgOptimizedImage} from "@angular/common";

@Component({
    selector: 'tq-trophy-suite-summary',
    imports: [
        TrophyCountDisplayerComponent,
        PlatformLabelComponent,
        NgOptimizedImage,
    ],
    templateUrl: './trophy-suite-summary.component.html',
    styleUrl: './trophy-suite-summary.component.scss',
})
export class TrophySuiteSummaryComponent {
    readonly trophySuite = input.required<TrophySuite>();
    readonly trophies = input<EarnedTrophy[]>([]);
    readonly gameDetails = input.required<TrophySuiteGameDetails>();

    readonly trophyCount = computed(() => (
        {
            platinum: this.trophies().filter(t => t.trophyType === 'platinum').length,
            gold: this.trophies().filter(t => t.trophyType === 'gold').length,
            silver: this.trophies().filter(t => t.trophyType === 'silver').length,
            bronze: this.trophies().filter(t => t.trophyType === 'bronze').length,
        } as TrophyCountPerType
    ));

    private readonly _masterImage = computed(() => {
        return this.gameDetails().images.find(i => i.imageType === 'MASTER')?.imageUrl;
    });

    private readonly _bannerImage = computed(() => {
        return this.gameDetails().images.find(i => i.imageType === 'BANNER')?.imageUrl;
    });

    readonly masterImage = computed(() => {
        return this._masterImage() ?? '';
    });

    readonly gameBannerImage = computed(() => {
        return this._bannerImage() ?? this.masterImage() ?? '';
    })
}
