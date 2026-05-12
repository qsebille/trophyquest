import {Component, computed, input, output} from '@angular/core';
import {DecimalPipe, NgOptimizedImage} from '@angular/common';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {SpinnerContainerComponent} from '../../../core/components/spinner-container/spinner-container.component';
import {PlayerSearchItem} from '../../../core/api/dtos/player/player-search-item';

@Component({
  selector: 'tq-profile-summary',
  imports: [
    NgOptimizedImage,
    DecimalPipe,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    SpinnerContainerComponent,
  ],
  templateUrl: './profile-summary.component.html',
  styleUrl: './profile-summary.component.scss',
})
export class ProfileSummaryComponent {
  readonly player = input.required<PlayerSearchItem>();
  readonly isLoading = input<boolean>(false);
  readonly isError = input<boolean>(false);
  readonly deletePlayer = output();

  readonly totalEarnedTrophies = computed(() => {
    return this.player().nbEarnedPlatinum +
      this.player().nbEarnedGold +
      this.player().nbEarnedSilver +
      this.player().nbEarnedBronze
  });

  getEarnedTrophyByType(trophyType: string): number {
    switch (trophyType) {
      case 'platinum':
        return this.player().nbEarnedPlatinum;
      case 'gold':
        return this.player().nbEarnedGold;
      case 'silver':
        return this.player().nbEarnedSilver;
      case 'bronze':
        return this.player().nbEarnedBronze;
      default:
        return 0;
    }
  }
}
