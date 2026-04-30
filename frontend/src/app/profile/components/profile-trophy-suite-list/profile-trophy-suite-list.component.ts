import {Component, computed, input, output} from '@angular/core';
import {ProfileTrophySuiteCardComponent} from "../profile-trophy-suite-card/profile-trophy-suite-card.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {PlayerTrophySuite} from "../../../core/api/dtos/trophy-suite/player-trophy-suite";
import {SpinnerContainerComponent} from '../../../core/components/spinner-container/spinner-container.component';

@Component({
  selector: 'tq-profile-trophy-suite-list',
  imports: [
    MatProgressSpinnerModule,
    ProfileTrophySuiteCardComponent,
    SpinnerContainerComponent,
  ],
  templateUrl: './profile-trophy-suite-list.component.html',
  styleUrl: './profile-trophy-suite-list.component.scss',
})
export class ProfileTrophySuiteListComponent {
  readonly trophySuites = input<PlayerTrophySuite[]>([]);
  readonly isLoading = input<boolean>(false);
  readonly total = input<number>(0);

  readonly onClickOnGame = output<{ gameId: string, trophySuiteId: string }>();
  readonly onLoadMoreGames = output();

  readonly hideLoadMoreButton = computed(() => this.isLoading() || this.trophySuites().length === this.total());
}
