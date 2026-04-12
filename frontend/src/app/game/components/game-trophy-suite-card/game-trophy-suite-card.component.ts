import {Component, input, output} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {PlatformLabelComponent} from "../../../core/components/platform-label/platform-label.component";
import {TrophySuiteWithCounts} from '../../../core/api/dtos/trophy-suite/trophy-suite-with-counts';
import {TrophyType} from '../../../core/models/enums/trophy-type.enum';
import {GameTrophySuiteDisplayMode} from '../../models/game-trophy-suite-display-mode';

@Component({
  selector: 'tq-game-trophy-suite-card',
  imports: [
    NgOptimizedImage,
    PlatformLabelComponent
  ],
  templateUrl: './game-trophy-suite-card.component.html',
  styleUrl: './game-trophy-suite-card.component.scss',
})
export class GameTrophySuiteCardComponent {
  trophySuite = input.required<TrophySuiteWithCounts>();
  displayMode = input.required<GameTrophySuiteDisplayMode>();
  selectTrophySuite = output<void>()

  readonly trophyTypes = [TrophyType.PLATINUM, TrophyType.GOLD, TrophyType.SILVER, TrophyType.BRONZE];
  readonly displayModes = GameTrophySuiteDisplayMode

  countTrophyByColor(trophyType: TrophyType): number {
    switch (trophyType) {
      case TrophyType.PLATINUM:
        return this.trophySuite().totalPlatinumTrophies;
      case TrophyType.GOLD:
        return this.trophySuite().totalGoldTrophies;
      case TrophyType.SILVER:
        return this.trophySuite().totalSilverTrophies;
      case TrophyType.BRONZE:
        return this.trophySuite().totalBronzeTrophies;
      default:
        return 0;
    }
  }
}
