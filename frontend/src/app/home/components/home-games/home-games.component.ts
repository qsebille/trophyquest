import {Component, computed, input, output} from '@angular/core';
import {ErrorMessageComponent} from "../../../core/components/error-message/error-message.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {RecentGame} from "../../../core/api/dtos/game/recent-game";
import {LoadingStatus} from "../../../core/models/loading-status.enum";
import {HomeGameCardComponent} from "../home-game-card/home-game-card.component";
import {SpinnerContainerComponent} from "../../../core/components/spinner-container/spinner-container.component";

@Component({
  selector: 'tq-home-games',
  imports: [
    ErrorMessageComponent,
    MatProgressSpinnerModule,
    HomeGameCardComponent,
    SpinnerContainerComponent
  ],
  templateUrl: './home-games.component.html',
  styleUrl: './home-games.component.scss',
})
export class HomeGamesComponent {
  readonly games = input<RecentGame[]>([]);
  readonly status = input<LoadingStatus>(LoadingStatus.NONE);
  readonly total = input.required<number>();
  readonly clickOnGame = output<string>();

  readonly isEmpty = computed(() => this.status() === LoadingStatus.FULLY_LOADED && this.total() === 0)
  readonly isLoading = computed(() => this.status() === LoadingStatus.LOADING)
  readonly isError = computed(() => this.status() === LoadingStatus.ERROR)
}
