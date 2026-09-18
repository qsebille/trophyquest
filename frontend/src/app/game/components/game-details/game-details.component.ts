import {Component, computed, input} from '@angular/core';
import {NgbCarousel, NgbSlide} from '@ng-bootstrap/ng-bootstrap';
import {DatePipe, NgOptimizedImage} from '@angular/common';
import {GameDetailsResponse} from '../../../pages/game-details/models/game-details-response';

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
  readonly gameDetails = input.required<GameDetailsResponse>();

  readonly hasScreenshots = computed(() => this.gameDetails()?.screenshotUrls?.length > 0)

  readonly hasIgdbInfo = computed(() => !!this.gameDetails()?.summary ||
    this.gameDetails()?.genres?.length > 0 ||
    this.gameDetails()?.themes?.length > 0
  );
}
