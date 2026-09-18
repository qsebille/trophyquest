import {Component, computed, input, output} from '@angular/core';
import {DecimalPipe, NgOptimizedImage} from '@angular/common';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {ProfileDetailsResponse} from '../../models/profile-details-response';

@Component({
  selector: 'tq-profile-details',
  imports: [
    NgOptimizedImage,
    DecimalPipe,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './profile-details.component.html',
  styleUrl: './profile-details.component.scss',
})
export class ProfileDetailsComponent {
  readonly details = input.required<ProfileDetailsResponse>();
  readonly isLoading = input<boolean>(false);
  readonly isError = input<boolean>(false);
  readonly deletePlayer = output();

  readonly totalEarnedTrophies = computed(() => {
    return this.details().nbEarnedPlatinumTrophies +
      this.details().nbEarnedGoldTrophies +
      this.details().nbEarnedSilverTrophies +
      this.details().nbEarnedBronzeTrophies
  });

  getEarnedTrophyByType(trophyType: string): number {
    switch (trophyType) {
      case 'platinum':
        return this.details().nbEarnedPlatinumTrophies;
      case 'gold':
        return this.details().nbEarnedGoldTrophies;
      case 'silver':
        return this.details().nbEarnedSilverTrophies;
      case 'bronze':
        return this.details().nbEarnedBronzeTrophies;
      default:
        return 0;
    }
  }
}
