import {Component, computed, input} from '@angular/core';
import {ErrorMessageComponent} from "../../../core/components/error-message/error-message.component";
import {LoadingStatus} from "../../../core/models/loading-status.enum";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {SpinnerContainerComponent} from "../../../core/components/spinner-container/spinner-container.component";
import {HomeStatsData} from '../../models/home-stats-data';

@Component({
  selector: 'tq-home-stats',
  imports: [
    MatIconModule,
    ErrorMessageComponent,
    MatProgressSpinnerModule,
    SpinnerContainerComponent,
  ],
  templateUrl: './home-stats.component.html',
  styleUrl: './home-stats.component.scss',
})
export class HomeStatsComponent {
  readonly stats = input.required<HomeStatsData | null>();
  readonly status = input<LoadingStatus>(LoadingStatus.NONE);

  readonly isLoading = computed(() => this.status() === LoadingStatus.LOADING);
  readonly hasFailed = computed(() => this.status() === LoadingStatus.ERROR);

  readonly statsAsList = computed(() => {
    return [
      {total: this.stats()?.total.player, recentCount: this.stats()?.lastWeek.player, label: 'players'},
      {total: this.stats()?.total.game, recentCount: this.stats()?.lastWeek.game, label: 'games'},
      {total: this.stats()?.total.trophy, recentCount: this.stats()?.lastWeek.trophy, label: 'trophies'},
    ]
  });
}
