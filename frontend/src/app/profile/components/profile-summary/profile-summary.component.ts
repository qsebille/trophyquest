import {Component, computed, input, output} from '@angular/core';
import {DecimalPipe, NgOptimizedImage} from '@angular/common';
import {Player} from '../../../core/api/dtos/player/player';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {PlayerStats} from "../../../core/api/dtos/player/player-stats";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'tq-profile-summary',
  imports: [
    NgOptimizedImage,
    DecimalPipe,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './profile-summary.component.html',
  styleUrl: './profile-summary.component.scss',
})
export class ProfileSummaryComponent {
  readonly player = input.required<Player>();
  readonly playerStats = input.required<PlayerStats>();
  readonly deletePlayer = output();

  readonly totalEarnedTrophies = computed(() => this.playerStats().totalPlatinumTrophies +
    this.playerStats().totalGoldTrophies +
    this.playerStats().totalSilverTrophies +
    this.playerStats().totalBronzeTrophies);

  getEarnedTrophyByType(trophyType: string): number {
    switch (trophyType) {
      case 'platinum':
        return this.playerStats().totalPlatinumTrophies;
      case 'gold':
        return this.playerStats().totalGoldTrophies;
      case 'silver':
        return this.playerStats().totalSilverTrophies;
      case 'bronze':
        return this.playerStats().totalBronzeTrophies;
      default:
        return 0;
    }
  }
}
