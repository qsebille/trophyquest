import {Component, input} from '@angular/core';
import {DatePipe, NgOptimizedImage} from '@angular/common';
import {ProfileTrophyItem} from '../../../models/profile-trophy-item';

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
  readonly trophy = input.required<ProfileTrophyItem>();

  isExpanded: boolean = false;

  toggleExpansion(): void {
    this.isExpanded = !this.isExpanded;
  }
}
