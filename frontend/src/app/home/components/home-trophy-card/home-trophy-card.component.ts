import {Component, input, output} from '@angular/core';
import {DatePipe, NgOptimizedImage} from '@angular/common';
import {HomeActivePlayerTrophy} from '../../models/home-active-player-trophy';

@Component({
  selector: 'tq-home-trophy-card',
  imports: [
    NgOptimizedImage,
    DatePipe,
  ],
  templateUrl: './home-trophy-card.component.html',
  styleUrl: './home-trophy-card.component.scss',
})
export class HomeTrophyCardComponent {
  readonly trophy = input.required<HomeActivePlayerTrophy>();
  readonly onClickOnGameTitle = output();
}
