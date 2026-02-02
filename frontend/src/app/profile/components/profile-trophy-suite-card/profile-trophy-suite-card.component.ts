import {Component, computed, input, output} from '@angular/core';
import {DecimalPipe, NgOptimizedImage} from '@angular/common';
import {PlatformLabelComponent} from "../../../core/components/platform-label/platform-label.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatIconModule} from "@angular/material/icon";
import {PlayedTrophySuiteSearchElement} from "../../../core/api/dtos/trophy-suite/played-trophy-suite-search-element";

@Component({
    selector: 'tq-profile-trophy-suite-card',
    imports: [
        DecimalPipe,
        MatProgressSpinnerModule,
        MatIconModule,
        PlatformLabelComponent,
        NgOptimizedImage,
    ],
    templateUrl: './profile-trophy-suite-card.component.html',
    styleUrl: './profile-trophy-suite-card.component.scss',
})
export class ProfileTrophySuiteCardComponent {
    readonly trophySuite = input.required<PlayedTrophySuiteSearchElement>();
    readonly clickOnTitle = output();

    readonly completionScore = computed(() => {
        const earnedTrophies: number = this.trophySuite().totalEarnedPlatinum +
            this.trophySuite().totalEarnedGold +
            this.trophySuite().totalEarnedSilver +
            this.trophySuite().totalEarnedBronze;

        return earnedTrophies / this.trophySuite().totalTrophies * 100;
    });
    readonly isCompleted = computed(() => this.completionScore() === 100);

    getEarnedTrophyByType(type: string): number {
        switch (type) {
            case 'platinum':
                return this.trophySuite().totalEarnedPlatinum;
            case 'gold':
                return this.trophySuite().totalEarnedGold;
            case 'silver':
                return this.trophySuite().totalEarnedSilver;
            case 'bronze':
                return this.trophySuite().totalEarnedBronze;
            default:
                return 0;
        }
    }
}
