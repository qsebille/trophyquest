import {Component, computed, input, signal} from '@angular/core';
import {
  NgbAccordionBody,
  NgbAccordionButton,
  NgbAccordionCollapse,
  NgbAccordionDirective,
  NgbAccordionHeader,
  NgbAccordionItem
} from "@ng-bootstrap/ng-bootstrap";
import {GameTrophyCardComponent} from '../game-trophy-card/game-trophy-card.component';
import {
  EarnedTrophyFilterState,
  GameTrophyFiltersComponent
} from '../game-trophy-filters/game-trophy-filters.component';
import {GameTrophyItem} from '../../../../pages/game-details/models/game-trophy-item';

@Component({
  selector: 'tq-game-trophy-list',
  imports: [
    NgbAccordionBody,
    NgbAccordionButton,
    NgbAccordionCollapse,
    NgbAccordionDirective,
    NgbAccordionHeader,
    NgbAccordionItem,
    GameTrophyCardComponent,
    GameTrophyFiltersComponent
  ],
  templateUrl: './game-trophy-list.component.html',
  styleUrl: './game-trophy-list.component.scss',
})
export class GameTrophyListComponent {
  trophies = input.required<GameTrophyItem[]>();
  selectedPlayerId = input<string | null>(null);

  showHiddenTrophies = signal(false);
  earnedFilterState = signal<EarnedTrophyFilterState>('all');

  filteredTrophies = computed(() => {
    if (this.earnedFilterState() === 'all') {
      return this.trophies();
    } else {
      return this.trophies().filter(t => this.earnedFilterState() === 'earned' ? !!t.earnedAt : !t.earnedAt);
    }
  });

  trophyGroups = computed(() => {
    const groupIds: string[] = []
    const groups: { trophyGroupId: string, trophyGroupName: string, trophies: GameTrophyItem[] }[] = []
    for (const trophy of this.filteredTrophies()) {
      if (!groupIds.includes(trophy.groupName)) {
        groupIds.push(trophy.groupName);
        groups.push({trophyGroupId: trophy.groupName, trophyGroupName: trophy.groupName, trophies: [trophy]});
      } else {
        groups.find(g => g.trophyGroupId === trophy.groupName)!.trophies.push(trophy);
      }
    }

    return groups.map(group => ({
      ...group,
      trophies: [...group.trophies].sort((a, b) => a.rank - b.rank),
    }));
  });
}
