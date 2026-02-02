import {Component, computed, input, output} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {PlayerSearchItem} from "../../../core/api/dtos/player/player-search-item";
import {TrophyCountPerType} from "../../../core/models/dto/trophy-count-per-type";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";

@Component({
    selector: 'tq-player-card',
    imports: [
        NgOptimizedImage,
        MatIconModule,
        MatTooltipModule,
    ],
    templateUrl: './player-card.component.html',
    styleUrl: './player-card.component.scss',
})
export class PlayerCardComponent {
    readonly playerSearchItem = input.required<PlayerSearchItem>();
    readonly clickOnPseudo = output();

    readonly trophyCount = computed(() => (
        {
            platinum: this.playerSearchItem().totalEarnedPlatinum,
            gold: this.playerSearchItem().totalEarnedGold,
            silver: this.playerSearchItem().totalEarnedSilver,
            bronze: this.playerSearchItem().totalEarnedBronze,
        } as TrophyCountPerType
    ));

    readonly trophyTypes = ['platinum', 'gold', 'silver', 'bronze'] as const;
}
