import {Component, computed, effect, input, output, untracked} from '@angular/core';
import {GameTrophySuiteCardComponent} from '../game-trophy-suite-card/game-trophy-suite-card.component';
import {
  GameTrophySuiteDisplayMode
} from '../../../../pages/game-details/models/constants/game-trophy-suite-display-mode.enum';
import {GameTrophyListComponent} from '../../trophy/game-trophy-list/game-trophy-list.component';
import {GameSuiteItem} from '../../../../pages/game-details/models/game-suite-item';
import {GameTrophyItem} from '../../../../pages/game-details/models/game-trophy-item';

@Component({
  selector: 'tq-game-trophy-suite-list',
  imports: [
    GameTrophySuiteCardComponent,
    GameTrophyListComponent
  ],
  templateUrl: './game-trophy-suite-list.component.html',
  styleUrl: './game-trophy-suite-list.component.scss',
})
export class GameTrophySuiteListComponent {
  suites = input.required<GameSuiteItem[]>();
  trophies = input.required<GameTrophyItem[]>();
  suiteId = input<string | null>(null);
  selectedPlayerId = input<string | null>(null);
  suiteInError = input<boolean>(false);
  trophiesInError = input<boolean>(false);
  suiteChange = output<string | null>();

  constructor() {
    effect(() => {
      const suites = this.suites();
      const suiteId = this.suiteId();

      if (suites.length === 1 && suiteId !== suites[0].suiteId) {
        untracked(() => this.suiteChange.emit(suites[0].suiteId));
      }
    });
  }

  displayMode = computed(() => {
    if (this.suites().length === 1) return GameTrophySuiteDisplayMode.SINGLE;

    return this.suiteId() == null ? GameTrophySuiteDisplayMode.MULTIPLE : GameTrophySuiteDisplayMode.SINGLE;
  });

  displayedSuites = computed(() => {
    if (this.suiteId() == null) {
      return this.suites();
    } else {
      return this.suites().filter(ts => ts.suiteId === this.suiteId());
    }
  });

  displayReturnToSuiteListButton = computed(() =>
    this.displayMode() === GameTrophySuiteDisplayMode.SINGLE && this.suites().length > 1
  );
}
