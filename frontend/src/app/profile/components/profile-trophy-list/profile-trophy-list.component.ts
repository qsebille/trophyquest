import {Component, computed, input, output} from '@angular/core';
import {ProfileTrophyCardComponent} from "../profile-trophy-card/profile-trophy-card.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {EarnedTrophySearchItem} from "../../../core/api/dtos/trophy/earned-trophy-search-item";
import {SpinnerContainerComponent} from '../../../core/components/spinner-container/spinner-container.component';

@Component({
  selector: 'tq-profile-trophy-list',
  imports: [
    MatProgressSpinnerModule,
    ProfileTrophyCardComponent,
    SpinnerContainerComponent,
  ],
  templateUrl: './profile-trophy-list.component.html',
  styleUrl: './profile-trophy-list.component.scss',
})
export class ProfileTrophyListComponent {
  readonly trophies = input<EarnedTrophySearchItem[]>([]);
  readonly isLoading = input<boolean>(false);
  readonly total = input<number>(0);
  readonly loadMoreTrophies = output();

  readonly hideLoadMoreButton = computed(() => this.isLoading() || this.trophies().length === this.total());
}
