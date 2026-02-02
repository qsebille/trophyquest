import {Component, computed, input} from '@angular/core';
import {
    TrophyCountDisplayerComponent
} from "../../../core/components/trophy-count-displayer/trophy-count-displayer.component";
import {TrophySuite} from "../../../core/api/dtos/trophy-suite/trophy-suite";
import {EarnedTrophy} from "../../../core/api/dtos/trophy/earned-trophy";
import {TrophyCountPerType} from "../../../core/models/dto/trophy-count-per-type";

@Component({
    selector: 'tq-trophy-suite-summary',
    imports: [
        TrophyCountDisplayerComponent,
    ],
    templateUrl: './trophy-suite-summary.component.html',
    styleUrl: './trophy-suite-summary.component.scss',
})
export class TrophySuiteSummaryComponent {
    readonly trophySuite = input.required<TrophySuite>();
    readonly trophies = input<EarnedTrophy[]>([]);

    readonly trophyCount = computed(() => (
        {
            platinum: this.trophies().filter(t => t.trophyType === 'platinum').length,
            gold: this.trophies().filter(t => t.trophyType === 'gold').length,
            silver: this.trophies().filter(t => t.trophyType === 'silver').length,
            bronze: this.trophies().filter(t => t.trophyType === 'bronze').length,
        } as TrophyCountPerType
    ));
}
