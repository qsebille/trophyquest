import {Component, input, output} from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import {NgOptimizedImage} from "@angular/common";
import {NgbTooltip} from "@ng-bootstrap/ng-bootstrap";
import {HomeGameItem} from '../../../models/home-game-item';

@Component({
  selector: 'tq-home-game-card',
  imports: [
    MatIconModule,
    NgOptimizedImage,
    NgbTooltip,
  ],
  templateUrl: './home-game-card.component.html',
  styleUrl: './home-game-card.component.scss',
})
export class HomeGameCardComponent {
  readonly game = input.required<HomeGameItem>();
  readonly onGameClick = output<string>();
}
