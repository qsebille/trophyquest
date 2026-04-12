import {Component, computed, input, signal} from '@angular/core';
import {EarnedTrophy} from '../../../core/api/dtos/trophy/earned-trophy';
import {DatePipe, NgOptimizedImage} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {
  NgbAccordionBody,
  NgbAccordionButton,
  NgbAccordionCollapse,
  NgbAccordionDirective,
  NgbAccordionHeader,
  NgbAccordionItem,
  NgbDropdown,
  NgbDropdownItem,
  NgbDropdownMenu,
  NgbDropdownToggle
} from '@ng-bootstrap/ng-bootstrap';
import {MatSlideToggle, MatSlideToggleChange} from '@angular/material/slide-toggle';

@Component({
  selector: 'tq-game-trophies',
  imports: [
    DatePipe,
    MatIcon,
    NgOptimizedImage,
    NgbAccordionDirective,
    NgbAccordionItem,
    NgbAccordionHeader,
    NgbAccordionButton,
    NgbAccordionCollapse,
    NgbAccordionBody,
    MatSlideToggle,
    NgbDropdown,
    NgbDropdownToggle,
    NgbDropdownMenu,
    NgbDropdownItem
  ],
  templateUrl: './game-trophies.component.html',
  styleUrl: './game-trophies.component.scss',
})
export class GameTrophiesComponent {
  trophies = input.required<EarnedTrophy[]>();
  selectedPlayerId = input<string | null>(null);

  showHiddenTrophies = signal(false);
  earnedFilter = signal<'all' | 'earned' | 'unearned'>('all');

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

  filteredTrophies = computed(() => {
    if (this.earnedFilter() === 'all') {
      return this.trophies();
    } else {
      return this.trophies().filter(t => this.earnedFilter() === 'earned' ? !!t.earnedAt : !t.earnedAt);
    }
  });

  trophyGroups = computed(() => {
    const groupIds: string[] = []
    const groups: { trophyGroupId: string, trophyGroupName: string, trophies: EarnedTrophy[] }[] = []
    for (const trophy of this.filteredTrophies()) {
      if (!groupIds.includes(trophy.trophyGroupId)) {
        groupIds.push(trophy.trophyGroupId);
        groups.push({trophyGroupId: trophy.trophyGroupId, trophyGroupName: trophy.trophyGroupName, trophies: [trophy]});
      } else {
        groups.find(g => g.trophyGroupId === trophy.trophyGroupId)!.trophies.push(trophy);
      }
    }

    return groups;
  });

  isTrophyHidden(trophy: EarnedTrophy): boolean {
    return trophy.isHidden && !this.showHiddenTrophies();
  }

  isTrophyEarned(trophy: EarnedTrophy): boolean {
    return !!trophy.earnedAt;
  }

  onHiddenFilterChanges(event: MatSlideToggleChange): void {
    this.showHiddenTrophies.set(event.checked);
  }
}
