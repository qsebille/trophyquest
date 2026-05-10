import {Component, computed, input, InputSignal} from '@angular/core';
import {GameDetails} from '../../../core/api/dtos/game/game-details';
import {NgbCarousel, NgbSlide} from '@ng-bootstrap/ng-bootstrap';
import {DatePipe, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'tq-game-details',
  imports: [
    NgbCarousel,
    NgbSlide,
    DatePipe,
    NgOptimizedImage,

  ],
  templateUrl: './game-details.component.html',
  styleUrl: './game-details.component.scss',
})
export class GameDetailsComponent {
  readonly gameDetails: InputSignal<GameDetails> = input.required<GameDetails>();

  readonly hasScreenshots = computed(() => this.gameDetails()?.screenshotsUrl?.length > 0)

  readonly hasIgdbInfo = computed(() => !!this.gameDetails()?.description ||
    this.gameDetails()?.genres?.length > 0 ||
    this.gameDetails()?.themes?.length > 0
  );
}
