import {Component, computed, input} from '@angular/core';
import {DatePipe, NgOptimizedImage} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {GameTrophyItem} from '../../../../pages/game-details/models/game-trophy-item';

@Component({
  selector: 'tq-game-trophy-card',
  imports: [
    DatePipe,
    MatIcon,
    NgOptimizedImage
  ],
  templateUrl: './game-trophy-card.component.html',
  styleUrl: './game-trophy-card.component.scss',
})
export class GameTrophyCardComponent {
  trophy = input.required<GameTrophyItem>();
  showHiddenTrophies = input<boolean>(false);

  isTrophyEarned = computed(() => !!this.trophy().earnedAt);
  isTrophyHidden = computed(() => this.trophy().isHidden && !this.showHiddenTrophies() && !this.isTrophyEarned());
}
