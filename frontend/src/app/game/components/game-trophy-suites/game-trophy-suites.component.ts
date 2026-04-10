import {Component, computed, effect, input, output, untracked} from '@angular/core';
import {ErrorMessageComponent} from '../../../core/components/error-message/error-message.component';
import {PlatformLabelComponent} from '../../../core/components/platform-label/platform-label.component';
import {TrophySuiteWithCounts} from '../../../core/api/dtos/trophy-suite/trophy-suite-with-counts';
import {NgOptimizedImage} from '@angular/common';
import {TrophyType} from '../../../core/models/enums/trophy-type.enum';
import {GameTrophiesComponent} from '../game-trophies/game-trophies.component';
import {EarnedTrophy} from '../../../core/api/dtos/trophy/earned-trophy';

@Component({
  selector: 'tq-game-trophy-suites',
  imports: [
    ErrorMessageComponent,
    PlatformLabelComponent,
    NgOptimizedImage,
    GameTrophiesComponent
  ],
  templateUrl: './game-trophy-suites.component.html',
  styleUrl: './game-trophy-suites.component.scss',
})
export class GameTrophySuitesComponent {
  trophySuites = input.required<TrophySuiteWithCounts[]>();
  trophies = input.required<EarnedTrophy[]>();
  trophySuiteId = input<string | null>(null);
  trophySuiteChange = output<string | null>();

  constructor() {
    effect(() => {
      const trophySuites = this.trophySuites();
      const trophySuiteId = this.trophySuiteId();

      if (trophySuites.length === 1 && trophySuiteId !== trophySuites[0].id) {
        untracked(() => this.trophySuiteChange.emit(trophySuites[0].id));
      }
    });
  }

  displayMode = computed(() => {
    if (this.trophySuites().length === 0) {
      return 'no-ts';
    }
    if (this.trophySuites().length === 1) {
      return 'single-ts';
    }

    return this.trophySuiteId() == null ? 'multi-ts' : 'single-ts';
  });

  displayedTrophySuites = computed(() => {
    if (this.trophySuiteId() == null) {
      return this.trophySuites();
    } else {
      return this.trophySuites().filter(ts => ts.id === this.trophySuiteId());
    }
  });

  displayReturnToSuiteListButton = computed(() => this.displayMode() === 'single-ts' && this.trophySuites().length > 1);

  trophyTypes = [TrophyType.PLATINUM, TrophyType.GOLD, TrophyType.SILVER, TrophyType.BRONZE];

  onSelectTrophySuite(id: string | null): void {
    this.trophySuiteChange.emit(id);
  }

  countTrophyByColor(trophySuite: TrophySuiteWithCounts, trophyType: TrophyType): number {
    switch (trophyType) {
      case TrophyType.PLATINUM:
        return trophySuite.totalPlatinumTrophies;
      case TrophyType.GOLD:
        return trophySuite.totalGoldTrophies;
      case TrophyType.SILVER:
        return trophySuite.totalSilverTrophies;
      case TrophyType.BRONZE:
        return trophySuite.totalBronzeTrophies;
      default:
        return 0;
    }
  }
}
