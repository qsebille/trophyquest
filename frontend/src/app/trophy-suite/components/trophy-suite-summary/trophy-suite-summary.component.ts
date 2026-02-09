import {Component, computed, input} from '@angular/core';
import {
    TrophyCountDisplayerComponent
} from "../../../core/components/trophy-count-displayer/trophy-count-displayer.component";
import {TrophySuite} from "../../../core/api/dtos/trophy-suite/trophy-suite";
import {EarnedTrophy} from "../../../core/api/dtos/trophy/earned-trophy";
import {TrophyCountPerType} from "../../../core/models/dto/trophy-count-per-type";
import {TrophySuiteGameDetails} from "../../../core/api/dtos/game/trophy-suite-game-details";
import {PlatformLabelComponent} from "../../../core/components/platform-label/platform-label.component";
import {JsonPipe, NgOptimizedImage} from "@angular/common";

@Component({
    selector: 'tq-trophy-suite-summary',
    imports: [
        TrophyCountDisplayerComponent,
        PlatformLabelComponent,
        NgOptimizedImage,
        JsonPipe,

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

    private readonly _igdbImages = computed(() => this.gameDetails().images.filter(i => i.source === 'IGDB'));
    private readonly _psnImages = computed(() => this.gameDetails().images.filter(i => i.source === 'PSN'));

    private readonly _psnMasterImage = computed(() => this._psnImages().find(i => i.imageType === 'MASTER')?.imageUrl);
    private readonly _artworkWithLogo = computed(() => this._igdbImages().find(i => i.imageType === 'artwork:key-artwork-with-logo')?.imageUrl);
    private readonly _artworkWithoutLogo = computed(() => this._igdbImages().find(i => i.imageType === 'artwork:key-artwork-without-logo')?.imageUrl);
    private readonly _screenshot = computed(() => this._igdbImages().find(i => i.imageType === 'screenshot')?.imageUrl);

    readonly masterImage = computed(() => this._psnMasterImage() ?? '');
    readonly gameBannerImage = computed(() => {
        return this._artworkWithoutLogo() ?? this._artworkWithLogo() ?? this._screenshot() ?? this.masterImage() ?? '';
    });
}
