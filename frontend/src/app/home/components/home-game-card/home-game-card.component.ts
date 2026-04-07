import {Component, input, output} from '@angular/core';
import {RecentGame} from "../../../core/api/dtos/game/recent-game";
import {MatIconModule} from "@angular/material/icon";
import {NgOptimizedImage} from "@angular/common";
import {NgbTooltip} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'tq-home-game-card',
  imports: [
    MatIconModule,
    NgOptimizedImage,
    NgbTooltip
  ],
  templateUrl: './home-game-card.component.html',
  styleUrl: './home-game-card.component.scss',
})
export class HomeGameCardComponent {
  readonly game = input.required<RecentGame>();
  readonly onGameClick = output<string>();
}
