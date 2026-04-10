import {Component, computed, input} from '@angular/core';
import {EarnedTrophy} from '../../../core/api/dtos/trophy/earned-trophy';
import {DatePipe, NgOptimizedImage} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {
  NgbAccordionBody,
  NgbAccordionButton,
  NgbAccordionCollapse,
  NgbAccordionDirective,
  NgbAccordionHeader,
  NgbAccordionItem
} from '@ng-bootstrap/ng-bootstrap';

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
    NgbAccordionBody
  ],
  templateUrl: './game-trophies.component.html',
  styleUrl: './game-trophies.component.scss',
})
export class GameTrophiesComponent {
  trophies = input.required<EarnedTrophy[]>();

  trophyGroups = computed(() => {
    const groupIds: string[] = []
    const groups: { trophyGroupId: string, trophyGroupName: string, trophies: EarnedTrophy[] }[] = []
    for (const trophy of this.trophies()) {
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
    // TODO: use selector to show or hide hidden trophies
    return trophy.isHidden ?? false;
  }

  isTrophyEarned(trophy: EarnedTrophy): boolean {
    // TODO: detect if trophy is earned by player. Need the info about the player first.
    return false;
  }
}
