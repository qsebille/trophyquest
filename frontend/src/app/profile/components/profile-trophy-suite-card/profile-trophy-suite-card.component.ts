import {Component, computed, input, output} from '@angular/core';
import {DecimalPipe, NgOptimizedImage} from '@angular/common';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatIconModule} from "@angular/material/icon";
import {PlayerTrophySuite} from "../../../core/api/dtos/trophy-suite/player-trophy-suite";

@Component({
  selector: 'tq-profile-trophy-suite-card',
  imports: [
    DecimalPipe,
    MatProgressSpinnerModule,
    MatIconModule,
    NgOptimizedImage,
  ],
  templateUrl: './profile-trophy-suite-card.component.html',
  styleUrl: './profile-trophy-suite-card.component.scss',
})
export class ProfileTrophySuiteCardComponent {
  readonly trophySuite = input.required<PlayerTrophySuite>();
  readonly onClickOnGame = output();

  readonly completionScore = computed(() => {
    const earnedTrophies: number = this.trophySuite().nbEarnedPlatinum +
      this.trophySuite().nbEarnedGold +
      this.trophySuite().nbEarnedSilver +
      this.trophySuite().nbEarnedBronze;

    return earnedTrophies / this.trophySuite().nbTrophies * 100;
  });
  readonly isCompleted = computed(() => this.completionScore() === 100);

  getEarnedTrophyByType(type: string): number {
    switch (type) {
      case 'platinum':
        return this.trophySuite().nbEarnedPlatinum;
      case 'gold':
        return this.trophySuite().nbEarnedGold;
      case 'silver':
        return this.trophySuite().nbEarnedSilver;
      case 'bronze':
        return this.trophySuite().nbEarnedBronze;
      default:
        return 0;
    }
  }
}
