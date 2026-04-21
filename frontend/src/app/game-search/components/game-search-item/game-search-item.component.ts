import {Component, input} from '@angular/core';
import {GameSearchItem} from '../../../core/api/dtos/game/game-search-item';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'tq-game-search-item',
  imports: [
    RouterLink
  ],
  templateUrl: './game-search-item.component.html',
  styleUrl: './game-search-item.component.scss',
})
export class GameSearchItemComponent {
  readonly game = input.required<GameSearchItem>();
}
