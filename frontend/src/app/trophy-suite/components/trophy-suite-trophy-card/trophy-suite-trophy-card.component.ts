import {Component, computed, input} from '@angular/core';
import {DatePipe, NgOptimizedImage} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {EarnedTrophy} from "../../../core/api/dtos/trophy/earned-trophy";

@Component({
    selector: 'tq-trophy-suite-trophy-card',
    imports: [
        DatePipe,
        MatIconModule,
        NgOptimizedImage
    ],
    templateUrl: './trophy-suite-trophy-card.component.html',
    styleUrl: './trophy-suite-trophy-card.component.scss',
})
export class TrophySuiteTrophyCardComponent {
    readonly trophy = input.required<EarnedTrophy>();
    readonly imageSize = input<number>(50);
    readonly showHiddenTrophies = input<boolean>(false);

    readonly isTrophyEarned = computed(() => this.trophy().earnedAt !== null);
    readonly isTrophyHidden = computed(() => {
        if (this.showHiddenTrophies() || this.isTrophyEarned()) return false;
        else return this.trophy().isHidden ?? false
    });
}
