import {Component, computed, input} from '@angular/core';
import {DatePipe, NgOptimizedImage} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {Trophy} from '../../../../core/api/dtos/trophy/trophy';

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
  trophy = input.required<Trophy>();
  showHiddenTrophies = input<boolean>(false);

  isTrophyHidden = computed(() => this.trophy().isHidden && !this.showHiddenTrophies());
  isTrophyEarned = computed(() => !!this.trophy().earnedAt);
}
