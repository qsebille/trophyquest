import {Component, input, output} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {TrophyType} from '../../../../core/models/enums/trophy-type.enum';
import {
  GameTrophySuiteDisplayMode
} from '../../../../pages/game-details/models/constants/game-trophy-suite-display-mode.enum';
import {GameSuiteItem} from '../../../../pages/game-details/models/game-suite-item';

@Component({
  selector: 'tq-game-trophy-suite-card',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './game-trophy-suite-card.component.html',
  styleUrl: './game-trophy-suite-card.component.scss',
})
export class GameTrophySuiteCardComponent {
  suite = input.required<GameSuiteItem>();
  displayMode = input.required<GameTrophySuiteDisplayMode>();
  selectTrophySuite = output<void>()

  readonly trophyTypes = [TrophyType.PLATINUM, TrophyType.GOLD, TrophyType.SILVER, TrophyType.BRONZE];
  readonly displayModes = GameTrophySuiteDisplayMode

  countTrophyByColor(trophyType: TrophyType): number {
    switch (trophyType) {
      case TrophyType.PLATINUM:
        return this.suite().nbPlatinumTrophies;
      case TrophyType.GOLD:
        return this.suite().nbGoldTrophies;
      case TrophyType.SILVER:
        return this.suite().nbSilverTrophies;
      case TrophyType.BRONZE:
        return this.suite().nbBronzeTrophies;
      default:
        return 0;
    }
  }
}
