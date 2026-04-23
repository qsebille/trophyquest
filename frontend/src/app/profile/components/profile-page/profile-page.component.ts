import {Component, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProfileSummaryComponent} from '../profile-summary/profile-summary.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {NavigatorService} from "../../../core/services/navigator.service";
import {ProfileSummaryStore} from "../../stores/profile-summary-store.service";
import {ProfileTrophiesStore} from "../../stores/profile-trophies-store.service";
import {ProfileTrophyListComponent} from "../profile-trophy-list/profile-trophy-list.component";
import {ProfileTrophySuiteListStoreService} from "../../stores/profile-trophy-suite-list-store.service";
import {ProfileTrophySuiteListComponent} from "../profile-trophy-suite-list/profile-trophy-suite-list.component";
import {GameCoverStoreService} from "../../../core/stores/game-cover-store.service";
import {ProfileDeleteService} from '../../services/profile-delete.service';

@Component({
  selector: 'tq-profile-page',
  imports: [
    ProfileSummaryComponent,
    MatProgressSpinnerModule,
    ProfileTrophyListComponent,
    ProfileTrophySuiteListComponent,

  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent {
  private readonly playerId: string;
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly profileDeleteService = inject(ProfileDeleteService);
  private readonly gameCoverStoreService: GameCoverStoreService = inject(GameCoverStoreService);
  private readonly profileSummaryStore: ProfileSummaryStore = inject(ProfileSummaryStore);
  private readonly profileTrophySuiteListStore: ProfileTrophySuiteListStoreService = inject(ProfileTrophySuiteListStoreService);
  private readonly profileTrophiesStore: ProfileTrophiesStore = inject(ProfileTrophiesStore);
  private readonly navigator: NavigatorService = inject(NavigatorService);

  readonly summary = this.profileSummaryStore.player;
  readonly playerStats = this.profileSummaryStore.playerStats;
  readonly trophySuites = this.profileTrophySuiteListStore.trophySuites;
  readonly trophies = this.profileTrophiesStore.trophies;
  readonly totalTrophySuites = this.profileTrophySuiteListStore.total;
  readonly totalTrophies = this.profileTrophiesStore.total;
  readonly isLoadingSummary = this.profileSummaryStore.isLoading;
  readonly isLoadingTrophySuites = this.profileTrophySuiteListStore.isLoading;
  readonly isLoadingTrophies = this.profileTrophiesStore.isLoading;

  constructor() {
    this.playerId = this.route.snapshot.paramMap.get('playerId') ?? '';
    if (this.playerId === '') {
      this.navigator.goToErrorPage();
      return;
    }
  }

  ngOnInit(): void {
    this.profileSummaryStore.retrieve(this.playerId);
    this.profileTrophySuiteListStore.search(this.playerId);
    this.profileTrophiesStore.search(this.playerId);
    this.gameCoverStoreService.refreshLastPlayedTrophySuiteForPlayer(this.playerId);
  }

  ngOnDestroy(): void {
    this.profileSummaryStore.reset();
    this.profileTrophySuiteListStore.reset();
    this.profileTrophiesStore.reset();
  }

  navigateToPlayerTrophySuitePage(trophySuiteId: string): void {
    this.navigator.goToTrophySuitePage(trophySuiteId, this.playerId);
  }

  loadMoreGames(): void {
    this.profileTrophySuiteListStore.loadMore(this.playerId);
  }

  loadMoreTrophies(): void {
    this.profileTrophiesStore.loadMore(this.playerId);
  }

  deletePlayer(): void {
    this.profileDeleteService.deleteProfile(this.playerId);
  }
}
