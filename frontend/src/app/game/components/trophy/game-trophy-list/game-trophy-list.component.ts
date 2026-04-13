import {Component, computed, input, signal} from '@angular/core';
import {
  NgbAccordionBody,
  NgbAccordionButton,
  NgbAccordionCollapse,
  NgbAccordionDirective,
  NgbAccordionHeader,
  NgbAccordionItem
} from "@ng-bootstrap/ng-bootstrap";
import {EarnedTrophy} from '../../../../core/api/dtos/trophy/earned-trophy';
import {GameTrophyCardComponent} from '../game-trophy-card/game-trophy-card.component';
import {
  EarnedTrophyFilterState,
  GameTrophyFiltersComponent
} from '../game-trophy-filters/game-trophy-filters.component';

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
  trophies = input.required<EarnedTrophy[]>();
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
}
