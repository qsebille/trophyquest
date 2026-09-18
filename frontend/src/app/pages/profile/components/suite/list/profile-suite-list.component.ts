import {Component, computed, input, output} from '@angular/core';
import {ProfileSuiteCardComponent} from "../card/profile-suite-card.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {SpinnerContainerComponent} from '../../../../../core/components/spinner-container/spinner-container.component';
import {ProfileSuiteItem} from '../../../models/profile-suite-item';
import {ErrorMessageComponent} from '../../../../../utils/error-message/error-message.component';

@Component({
  selector: 'tq-profile-suite-list',
  imports: [
    MatProgressSpinnerModule,
    ProfileSuiteCardComponent,
    SpinnerContainerComponent,
    ErrorMessageComponent,
  ],
  templateUrl: './profile-suite-list.component.html',
  styleUrl: './profile-suite-list.component.scss',
})
export class ProfileSuiteListComponent {
  readonly suites = input<ProfileSuiteItem[]>([]);
  readonly isLoading = input<boolean>(false);
  readonly hasError = input<boolean>(false);
  readonly total = input<number>(0);

  readonly onClickOnSuite = output<string>();
  readonly onLoadMoreGames = output();

  readonly showLoadMoreButton = computed(() => !this.isLoading() && this.suites().length < this.total());
}
