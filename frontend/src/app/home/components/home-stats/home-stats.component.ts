import {Component, computed, input} from '@angular/core';
import {HomeStatsData} from '../../models/home-stats-data';

@Component({
  selector: 'tq-home-stats',
  imports: [],
  templateUrl: './home-stats.component.html',
  styleUrl: './home-stats.component.scss',
})
export class HomeStatsComponent {
  readonly stats = input.required<HomeStatsData | null>();

  readonly statsAsList = computed(() => {
    return [
      {total: this.stats()?.total.player, recentCount: this.stats()?.lastWeek.player, label: 'players'},
      {total: this.stats()?.total.game, recentCount: this.stats()?.lastWeek.game, label: 'games'},
      {total: this.stats()?.total.trophy, recentCount: this.stats()?.lastWeek.trophy, label: 'trophies'},
    ]
  });
}
