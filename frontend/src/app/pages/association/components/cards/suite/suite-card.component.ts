import {Component, computed, input} from '@angular/core';
import {AssociationSuiteItem} from '../../../models/association-suite-item';

@Component({
  selector: 'tq-association-suite-card',
  imports: [],
  templateUrl: './suite-card.component.html',
  styleUrl: './suite-card.component.scss',
})
export class SuiteCardComponent {
  readonly suite = input.required<AssociationSuiteItem>();

  readonly imageUrl = computed(() => this.suite().imageUrl)
}
