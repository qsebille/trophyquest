import {Component, computed, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProfileSummaryComponent} from '../profile-summary/profile-summary.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {NavigatorService} from "../../../core/services/navigator.service";
import {ProfileSummaryStore} from "../../stores/profile-summary-store.service";
import {ProfileTrophiesStore} from "../../stores/profile-trophies-store.service";
import {ErrorMessageComponent} from "../../../core/components/error-message/error-message.component";
import {LoadingStatus} from "../../../core/models/loading-status.enum";
import {ProfileTrophyListComponent} from "../profile-trophy-list/profile-trophy-list.component";
import {ProfileTrophySuiteListStoreService} from "../../stores/profile-trophy-suite-list-store.service";
import {ProfileTrophySuiteListComponent} from "../profile-trophy-suite-list/profile-trophy-suite-list.component";
import {PlayerApiService} from "../../../core/api/services/player-api.service";
import {catchError, EMPTY, tap} from "rxjs";
import {GameCoverStoreService} from "../../../core/stores/game-cover-store.service";
import {SpinnerContainerComponent} from '../../../core/components/spinner-container/spinner-container.component';

@Component({
  selector: 'tq-profile-page',
  imports: [
    ProfileSummaryComponent,
    MatProgressSpinnerModule,
    ErrorMessageComponent,
    ProfileTrophyListComponent,
    ProfileTrophySuiteListComponent,
    SpinnerContainerComponent,
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent {
  private readonly playerId: string | null;
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly playerApiService: PlayerApiService = inject(PlayerApiService);
  private readonly gameCoverStoreService: GameCoverStoreService = inject(GameCoverStoreService);
  private readonly profileSummaryStore: ProfileSummaryStore = inject(ProfileSummaryStore);
  private readonly profileTrophySuiteListStore: ProfileTrophySuiteListStoreService = inject(ProfileTrophySuiteListStoreService);
  private readonly profileTrophiesStore: ProfileTrophiesStore = inject(ProfileTrophiesStore);

  readonly navigator: NavigatorService = inject(NavigatorService);
  readonly summary = this.profileSummaryStore.player;
  readonly playerStats = this.profileSummaryStore.playerStats;
  readonly trophySuites = this.profileTrophySuiteListStore.trophySuites;
  readonly trophies = this.profileTrophiesStore.trophies;
  readonly hasFailedLoading = computed(() =>
    this.profileSummaryStore.status() === LoadingStatus.ERROR ||
    this.profileTrophySuiteListStore.status() === LoadingStatus.ERROR ||
    this.profileTrophiesStore.status() === LoadingStatus.ERROR
  );
  readonly isLoading = computed(() =>
    this.profileSummaryStore.status() === LoadingStatus.LOADING ||
    this.profileTrophySuiteListStore.status() === LoadingStatus.LOADING ||
    this.profileTrophiesStore.status() === LoadingStatus.LOADING
  );
  readonly hasMoreTrophiesToLoad = computed(() =>
    this.profileTrophiesStore.status() === LoadingStatus.PARTIALLY_LOADED
  );
  readonly hasMoreTrophySuitesToLoad = computed(() =>
    this.profileTrophySuiteListStore.status() === LoadingStatus.PARTIALLY_LOADED
  );

  constructor() {
    this.playerId = this.route.snapshot.paramMap.get('playerId');
  }

  ngOnInit(): void {
    this.gameCoverStoreService.refreshLastPlayedTrophySuiteForPlayer(this.playerId);
    this.loadProfileData();
  }

  ngOnDestroy(): void {
    this.resetData();
  }

  resetAndLoad(): void {
    this.resetData();
    this.loadProfileData();
  }

  private resetData(): void {
    this.profileSummaryStore.reset();
    this.profileTrophySuiteListStore.reset();
    this.profileTrophiesStore.reset();
  }

  private loadProfileData(): void {
    this.profileSummaryStore.retrieve(this.playerId);
    this.profileTrophySuiteListStore.search(this.playerId);
    this.profileTrophiesStore.search(this.playerId);
  }

  navigateToPlayerTrophySuitePage(trophySuiteId: string): void {
    if (this.playerId === null) {
      console.error('Player ID is null');
    } else {
      this.navigator.goToTrophySuitePage(trophySuiteId, this.playerId);
    }
  }

  loadMoreGames(): void {
    this.profileTrophySuiteListStore.loadMore(this.playerId);
  }

  loadMoreTrophies(): void {
    this.profileTrophiesStore.loadMore(this.playerId);
  }

  deletePlayer(): void {
    console.log(`Deleting player ${this.playerId}...`);
    this.playerApiService.deletePlayer(this.playerId ?? "").pipe(
      tap(() => {
        console.log(`Player ${this.playerId} deleted`);
        this.navigator.goToPlayersPage();
      }),
      catchError((error) => {
        console.error(`Failed to delete player ${this.playerId}`, error);
        return EMPTY;
      })
    ).subscribe();
  }
}
