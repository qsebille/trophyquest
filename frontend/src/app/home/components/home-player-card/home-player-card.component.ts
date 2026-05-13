import {Component, input, output} from '@angular/core';
import {DecimalPipe, NgOptimizedImage} from "@angular/common";
import {HomeActivePlayer} from '../../models/home-active-player';

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
  readonly player = input.required<HomeActivePlayer>();
  readonly onClickOnPseudo = output();
}
