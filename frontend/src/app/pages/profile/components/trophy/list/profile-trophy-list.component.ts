import {Component, computed, input, output} from '@angular/core';
import {ProfileTrophyCardComponent} from "../card/profile-trophy-card.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {ProfileTrophyItem} from '../../../models/profile-trophy-item';
import {ErrorMessageComponent} from '../../../../../utils/error-message/error-message.component';
import {SpinnerContainerComponent} from '../../../../../core/components/spinner-container/spinner-container.component';

@Component({
  selector: 'tq-profile-trophy-list',
  imports: [
    MatProgressSpinnerModule,
    ProfileTrophyCardComponent,
    ErrorMessageComponent,
    SpinnerContainerComponent,

  ],
  templateUrl: './profile-trophy-list.component.html',
  styleUrl: './profile-trophy-list.component.scss',
})
export class ProfileTrophyListComponent {
  readonly trophies = input<ProfileTrophyItem[]>([]);
  readonly isLoading = input<boolean>(false);
  readonly hasError = input<boolean>(false);
  readonly total = input<number>(0);
  readonly loadMoreTrophies = output();

  readonly showLoadMoreButton = computed(() => !this.isLoading() && this.trophies().length < this.total());
}
