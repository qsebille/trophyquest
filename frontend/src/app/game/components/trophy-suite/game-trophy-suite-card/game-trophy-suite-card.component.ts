import {Component, input, output} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {TrophySuite} from '../../../../core/api/dtos/trophy-suite/trophy-suite';
import {TrophyType} from '../../../../core/models/enums/trophy-type.enum';
import {GameTrophySuiteDisplayMode} from '../../../models/game-trophy-suite-display-mode.enum';

@Component({
  selector: 'tq-game-trophy-suite-card',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './game-trophy-suite-card.component.html',
  styleUrl: './game-trophy-suite-card.component.scss',
})
export class GameTrophySuiteCardComponent {
  trophySuite = input.required<TrophySuite>();
  displayMode = input.required<GameTrophySuiteDisplayMode>();
  selectTrophySuite = output<void>()

  readonly trophyTypes = [TrophyType.PLATINUM, TrophyType.GOLD, TrophyType.SILVER, TrophyType.BRONZE];
  readonly displayModes = GameTrophySuiteDisplayMode

  countTrophyByColor(trophyType: TrophyType): number {
    switch (trophyType) {
      case TrophyType.PLATINUM:
        return this.trophySuite().nbPlatinumTrophies;
      case TrophyType.GOLD:
        return this.trophySuite().nbGoldTrophies;
      case TrophyType.SILVER:
        return this.trophySuite().nbSilverTrophies;
      case TrophyType.BRONZE:
        return this.trophySuite().nbBronzeTrophies;
      default:
        return 0;
    }
  }
}
