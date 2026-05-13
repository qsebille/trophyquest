import {Component, input} from '@angular/core';
import {DatePipe, NgOptimizedImage} from '@angular/common';
import {PlayerEarnedTrophy} from "../../../core/api/dtos/trophy/player-earned-trophy";

@Component({
  selector: 'tq-profile-trophy-card',
  imports: [
    DatePipe,
    NgOptimizedImage
  ],
  templateUrl: './profile-trophy-card.component.html',
  styleUrl: './profile-trophy-card.component.scss',
})
export class ProfileTrophyCardComponent {
  readonly trophy = input.required<PlayerEarnedTrophy>();

  isExpanded: boolean = false;

  toggleExpansion(): void {
    this.isExpanded = !this.isExpanded;
  }
}
