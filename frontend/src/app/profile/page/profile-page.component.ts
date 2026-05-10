import {Component, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProfileSummaryComponent} from '../components/profile-summary/profile-summary.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {NavigatorService} from "../../core/services/navigator.service";
import {ProfileTrophyListComponent} from "../components/profile-trophy-list/profile-trophy-list.component";
import {
  ProfileTrophySuiteListComponent
} from "../components/profile-trophy-suite-list/profile-trophy-suite-list.component";
import {BackgroundImageService} from "../../core/stores/background-image.service";
import {ProfileDeleteService} from '../services/profile-delete.service';
import {ProfileTrophySuiteDataService} from '../services/profile-trophy-suite-data.service';
import {ProfileSummaryDataService} from '../services/profile-summary-data.service';
import {NotificationService} from '../../core/services/notification.service';
import {ProfileTrophyDataService} from '../services/profile-trophy-data.service';

@Component({
  selector: 'tq-profile-page',
  imports: [
    ProfileSummaryComponent,
    MatProgressSpinnerModule,
    ProfileTrophyListComponent,
    ProfileTrophySuiteListComponent,
  ],
  providers: [
    ProfileSummaryDataService,
    ProfileTrophySuiteDataService,
    ProfileTrophyDataService,
    ProfileDeleteService,
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent {
  private readonly playerId: string | null;
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly profileDeleteService = inject(ProfileDeleteService);
  private readonly backgroundImageService = inject(BackgroundImageService);
  private readonly profileSummaryDataService = inject(ProfileSummaryDataService);
  private readonly profileTrophySuiteDataService = inject(ProfileTrophySuiteDataService);
  private readonly profileTrophyDataService = inject(ProfileTrophyDataService);
  private readonly navigator = inject(NavigatorService);
  private readonly notificationService = inject(NotificationService);

  readonly summary = this.profileSummaryDataService.data;
  readonly isLoadingSummary = this.profileSummaryDataService.isLoading;
  readonly isSummaryInError = this.profileSummaryDataService.isError;

  readonly trophySuites = this.profileTrophySuiteDataService.trophySuites;
  readonly totalTrophySuites = this.profileTrophySuiteDataService.total;
  readonly isLoadingTrophySuites = this.profileTrophySuiteDataService.isLoading;
  readonly isTrophySuitesInError = this.profileTrophySuiteDataService.isError;

  readonly trophies = this.profileTrophyDataService.trophies;
  readonly totalTrophies = this.profileTrophyDataService.total;
  readonly isLoadingTrophies = this.profileTrophyDataService.isLoading;
  readonly isTrophiesInError = this.profileTrophyDataService.isError;

  constructor() {
    this.playerId = this.route.snapshot.paramMap.get('playerId');
    if (this.playerId === '') {
      this.navigator.goToErrorPage();
      return;
    }
  }

  ngOnInit(): void {
    this.profileSummaryDataService.retrieve(this.playerId);
    this.profileTrophySuiteDataService.init(this.playerId);
    this.profileTrophyDataService.init(this.playerId);
    this.backgroundImageService.usePlayerLastGameBackground(this.playerId);
  }

  ngOnDestroy(): void {
    this.profileSummaryDataService.reset();
    this.profileTrophySuiteDataService.reset();
    this.profileTrophyDataService.reset();
  }

  navigateToPlayerTrophySuitePage(event: { gameId: string, trophySuiteId: string }): void {
    const playerId = this.playerId;
    if (playerId === null) {
      this.notificationService.error('Unable to navigate to game page');
      return;
    }
    this.navigator.goToTrophySuitePage(event.trophySuiteId, event.gameId, playerId);
  }

  loadMoreTrophySuites(): void {
    this.profileTrophySuiteDataService.loadMore();
  }

  loadMoreTrophies(): void {
    this.profileTrophyDataService.loadMore();
  }

  deletePlayer(): void {
    this.profileDeleteService.deleteProfile(this.playerId);
  }
}
