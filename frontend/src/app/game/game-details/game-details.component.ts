import {Component, computed, input, InputSignal, Signal} from '@angular/core';
import {GameDetails} from '../../core/api/dtos/game/game-details';
import {NgbCarousel, NgbSlide} from '@ng-bootstrap/ng-bootstrap';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'tq-game-details',
  imports: [
    NgbCarousel,
    NgbSlide,
    DatePipe,

  ],
  templateUrl: './game-details.component.html',
  styleUrl: './game-details.component.scss',
})
export class GameDetailsComponent {
  readonly gameDetails: InputSignal<GameDetails> = input.required<GameDetails>();

  readonly hasIgdbInfo: Signal<boolean> = computed(() => !!this.gameDetails()?.description ||
    this.gameDetails()?.genres?.length > 0 ||
    this.gameDetails()?.themes?.length > 0
  );

  readonly images: Signal<string[]> = computed(() => {
    return (this.gameDetails()?.images ?? [])
      .filter(i => i.imageType === 'screenshot' || i.imageType === 'SCREENSHOT')
      .map(i => i.imageUrl)
  });
}
