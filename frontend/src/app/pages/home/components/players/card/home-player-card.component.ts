import {Component, computed, input, output} from '@angular/core';
import {DecimalPipe, NgOptimizedImage} from "@angular/common";
import {HomePlayerItem} from '../../../models/home-player-item';

@Component({
  selector: 'tq-home-player-card',
  imports: [
    NgOptimizedImage,
    DecimalPipe
  ],
  templateUrl: './home-player-card.component.html',
  styleUrl: './home-player-card.component.scss',
})
export class HomePlayerCardComponent {
  readonly player = input.required<HomePlayerItem>();
  readonly onClickOnPseudo = output();

  readonly nbRecentlyEarnedTrophies = computed(() => {
    return this.player().nbRecentBronzeTrophies +
      this.player().nbRecentSilverTrophies +
      this.player().nbRecentGoldTrophies +
      this.player().nbRecentPlatinumTrophies
  });


  getEarnedTrophyByType(type: string): number {
    switch (type) {
      case 'platinum':
        return this.player().nbRecentPlatinumTrophies;
      case 'gold':
        return this.player().nbRecentGoldTrophies;
      case 'silver':
        return this.player().nbRecentSilverTrophies;
      case 'bronze':
        return this.player().nbRecentBronzeTrophies;
      default:
        return 0;
    }
  }
}
