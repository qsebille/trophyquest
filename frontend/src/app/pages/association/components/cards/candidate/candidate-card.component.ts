import {Component, computed, input, output} from '@angular/core';
import {AssociationGameItem} from '../../../models/association-game-item';
import {MatIcon} from '@angular/material/icon';
import {DatePipe, DecimalPipe, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'tq-association-candidate-card',
  imports: [
    MatIcon,
    DecimalPipe,
    NgOptimizedImage,
    DatePipe,
  ],
  templateUrl: './candidate-card.component.html',
  styleUrl: './candidate-card.component.scss',
})
export class CandidateCardComponent {
  readonly candidate = input.required<AssociationGameItem>();
  readonly isSelected = input.required<boolean>();
  readonly selectCandidate = output<void>();

  readonly score = computed(() => this.candidate().score * 100);

  readonly platforms = computed(() => {
    return this.candidate().platforms.filter(platform => platform.startsWith("PlayStation"))
      .sort((a, b) => a.localeCompare(b));
  });

  readonly coverUrl = computed(() => this.candidate().coverUrl ?? 'assets/images/association/candidate-cover-placeholder.png');
}
