import {Component, computed, input, output, signal} from '@angular/core';
import {ErrorMessageComponent} from '../../../core/components/error-message/error-message.component';
import {PlatformLabelComponent} from '../../../core/components/platform-label/platform-label.component';
import {TrophySuiteWithCounts} from '../../../core/api/dtos/trophy-suite/trophy-suite-with-counts';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'tq-game-trophy-suites',
  imports: [
    ErrorMessageComponent,
    PlatformLabelComponent,
    NgOptimizedImage
  ],
  templateUrl: './game-trophy-suites.component.html',
  styleUrl: './game-trophy-suites.component.scss',
})
export class GameTrophySuitesComponent {
  trophySuites = input.required<TrophySuiteWithCounts[]>();
  trophySuiteId = input<string | null>(null);
  trophySuiteChange = output<string | null>();

  selectedTrophySuiteId = signal<string | null>(null);
  displayedTrophySuiteId = computed(() => this.selectedTrophySuiteId() ?? this.trophySuiteId());

  displayMode = computed(() => {
    if (this.trophySuites().length === 0) {
      return 'no-ts';
    }
    if (this.trophySuites().length === 1) {
      return 'single-ts';
    }

    return this.displayedTrophySuiteId() == null ? 'multi-ts' : 'single-ts';
  });

  displayedTrophySuites = computed(() => {
    if (this.displayedTrophySuiteId() == null) {
      return this.trophySuites();
    } else {
      return this.trophySuites().filter(ts => ts.id === this.displayedTrophySuiteId());
    }
  });

  displayReturnToSuiteListButton = computed(() => this.displayMode() === 'single-ts' && this.trophySuites().length > 1);

  ngOnInit(): void {
    this.selectedTrophySuiteId.set(this.trophySuiteId());
  }

  onSelectTrophySuite(id: string | null): void {
    this.trophySuiteChange.emit(id);
    this.selectedTrophySuiteId.set(id);
  }

  countTrophyByColor(trophySuite: TrophySuiteWithCounts, trophyType: string): number {
    switch (trophyType) {
      case 'platinum':
        return trophySuite.totalPlatinumTrophies;
      case 'gold':
        return trophySuite.totalGoldTrophies;
      case 'silver':
        return trophySuite.totalSilverTrophies;
      case 'bronze':
        return trophySuite.totalBronzeTrophies;
      default:
        return 0;
    }
  }
}
