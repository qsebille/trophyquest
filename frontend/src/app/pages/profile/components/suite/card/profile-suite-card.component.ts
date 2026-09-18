import {Component, computed, input, output} from '@angular/core';
import {DecimalPipe, NgOptimizedImage} from '@angular/common';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatIconModule} from "@angular/material/icon";
import {ProfileSuiteItem} from '../../../models/profile-suite-item';

@Component({
  selector: 'tq-profile-suite-card',
  imports: [
    DecimalPipe,
    MatProgressSpinnerModule,
    MatIconModule,
    NgOptimizedImage,
  ],
  templateUrl: './profile-suite-card.component.html',
  styleUrl: './profile-suite-card.component.scss',
})
export class ProfileSuiteCardComponent {
  readonly suite = input.required<ProfileSuiteItem>();
  readonly onClickOnSuite = output();

  readonly completionScore = computed(() => {
    const earnedTrophies: number = this.suite().nbEarnedPlatinumTrophies +
      this.suite().nbEarnedGoldTrophies +
      this.suite().nbEarnedSilverTrophies +
      this.suite().nbEarnedBronzeTrophies;

    return earnedTrophies / this.suite().nbTrophies * 100;
  });
  readonly isCompleted = computed(() => this.completionScore() === 100);

  getEarnedTrophyByType(type: string): number {
    switch (type) {
      case 'platinum':
        return this.suite().nbEarnedPlatinumTrophies;
      case 'gold':
        return this.suite().nbEarnedGoldTrophies;
      case 'silver':
        return this.suite().nbEarnedSilverTrophies;
      case 'bronze':
        return this.suite().nbEarnedBronzeTrophies;
      default:
        return 0;
    }
  }
}
