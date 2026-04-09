import {Component, input} from '@angular/core';
import {EarnedTrophy} from '../../../core/api/dtos/trophy/earned-trophy';
import {DatePipe, JsonPipe, NgOptimizedImage} from '@angular/common';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'tq-game-trophies',
  imports: [
    JsonPipe,
    DatePipe,
    MatIcon,
    NgOptimizedImage
  ],
  templateUrl: './game-trophies.component.html',
  styleUrl: './game-trophies.component.scss',
})
export class GameTrophiesComponent {
  trophies = input.required<EarnedTrophy[]>();

  isTrophyHidden(trophy: EarnedTrophy): boolean {
    // TODO: use also filters
    return trophy.isHidden ?? false;
  }

  isTrophyEarned(trophy: EarnedTrophy): boolean {
    // TODO: detect if trophy is earned by player. Need the info about the player first.
    return false;
  }
}
