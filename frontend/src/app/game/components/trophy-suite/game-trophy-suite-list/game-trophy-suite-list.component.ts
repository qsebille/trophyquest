import {Component, computed, effect, input, output, untracked} from '@angular/core';
import {TrophySuiteWithCounts} from '../../../../core/api/dtos/trophy-suite/trophy-suite-with-counts';
import {EarnedTrophy} from '../../../../core/api/dtos/trophy/earned-trophy';
import {GameTrophySuiteCardComponent} from '../game-trophy-suite-card/game-trophy-suite-card.component';
import {GameTrophySuiteDisplayMode} from '../../../models/game-trophy-suite-display-mode.enum';
import {GameTrophyListComponent} from '../../trophy/game-trophy-list/game-trophy-list.component';

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
  trophySuites = input.required<TrophySuiteWithCounts[]>();
  trophies = input.required<EarnedTrophy[]>();
  trophySuiteId = input<string | null>(null);
  selectedPlayerId = input<string | null>(null);
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
    if (this.trophySuites().length === 0) return GameTrophySuiteDisplayMode.NONE;
    if (this.trophySuites().length === 1) return GameTrophySuiteDisplayMode.SINGLE;

    return this.trophySuiteId() == null ? GameTrophySuiteDisplayMode.MULTIPLE : GameTrophySuiteDisplayMode.SINGLE;
  });

  noTrophySuite = computed(() => this.displayMode() === GameTrophySuiteDisplayMode.NONE);

  displayedTrophySuites = computed(() => {
    if (this.trophySuiteId() == null) {
      return this.trophySuites();
    } else {
      return this.trophySuites().filter(ts => ts.id === this.trophySuiteId());
    }
  });

  displayReturnToSuiteListButton = computed(() =>
    this.displayMode() === GameTrophySuiteDisplayMode.SINGLE && this.trophySuites().length > 1
  );
}
