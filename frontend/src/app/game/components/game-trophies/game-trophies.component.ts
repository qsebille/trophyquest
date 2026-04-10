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
  NgbAccordionItem
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
    MatSlideToggle
  ],
  templateUrl: './game-trophies.component.html',
  styleUrl: './game-trophies.component.scss',
})
export class GameTrophiesComponent {
  trophies = input.required<EarnedTrophy[]>();

  showHiddenTrophies = signal(false);

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
    return trophy.isHidden && !this.showHiddenTrophies();
  }

  isTrophyEarned(trophy: EarnedTrophy): boolean {
    return !!trophy.earnedAt;
  }

  onHiddenFilterChanges(event: MatSlideToggleChange): void {
    this.showHiddenTrophies.set(event.checked);
  }
}
