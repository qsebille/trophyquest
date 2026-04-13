import {Component, computed, input, output, signal} from '@angular/core';
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'tq-game-trophy-filters',
  imports: [
    MatSlideToggle,
    NgbDropdown,
    NgbDropdownItem,
    NgbDropdownMenu,
    NgbDropdownToggle
  ],
  templateUrl: './game-trophy-filters.component.html',
  styleUrl: './game-trophy-filters.component.scss',
})
export class GameTrophyFiltersComponent {
  selectedPlayerId = input<string | null>(null);
  earnedFilterChange = output<EarnedTrophyFilterState>();
  hiddenFilterChange = output<boolean>();

  earnedFilter = signal<EarnedTrophyFilterState>('all');

  earnedFilterLabel = computed(() => {
    switch (this.earnedFilter()) {
      case 'all':
        return 'All trophies';
      case 'earned':
        return 'Earned only';
      case 'unearned':
        return 'Unearned only';
    }
  });

  onEarnedFilterChange(state: EarnedTrophyFilterState): void {
    this.earnedFilter.set(state);
    this.earnedFilterChange.emit(state);
  }
}

export type EarnedTrophyFilterState = 'all' | 'earned' | 'unearned';
