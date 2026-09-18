import {Component, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {NavigatorService} from "../../core/services/navigator.service";
import {ProfileTrophyListComponent} from "./components/trophy/list/profile-trophy-list.component";
import {BackgroundImageService} from "../../core/stores/background-image.service";
import {ProfileDeleteService} from './services/profile-delete.service';
import {ProfileTrophySuiteDataService} from './services/profile-trophy-suite-data.service';
import {ProfileDetailsStoreService} from './services/stores/profile-details-store.service';
import {ProfileDetailsComponent} from './components/details/profile-details.component';
import {SpinnerContainerComponent} from '../../core/components/spinner-container/spinner-container.component';
import {ErrorMessageComponent} from '../../utils/error-message/error-message.component';
import {ProfileTrophyStoreService} from './services/stores/profile-trophy-store.service';
import {ProfileSuiteStoreService} from './services/stores/profile-suite-store.service';
import {ProfileSuiteListComponent} from './components/suite/list/profile-suite-list.component';

@Component({
  selector: 'tq-profile-page',
  imports: [
    MatProgressSpinnerModule,
    ProfileTrophyListComponent,
    ProfileDetailsComponent,
    SpinnerContainerComponent,
    ErrorMessageComponent,
    ProfileSuiteListComponent,
  ],
  providers: [
    ProfileDetailsStoreService,
    ProfileTrophySuiteDataService,
    ProfileTrophyStoreService,
    ProfileDeleteService,
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent {
  private readonly playerId: string | null;
  private readonly route: ActivatedRoute = inject(ActivatedRoute);

  private readonly backgroundImageService = inject(BackgroundImageService);
  private readonly deleteService = inject(ProfileDeleteService);
  private readonly detailsStore = inject(ProfileDetailsStoreService);
  private readonly suiteStore = inject(ProfileSuiteStoreService);
  private readonly trophyStore = inject(ProfileTrophyStoreService);
  private readonly navigator = inject(NavigatorService);

  readonly details = this.detailsStore.details;
  readonly isLoadingDetails = this.detailsStore.isLoading;
  readonly hasErrorFetchingDetails = this.detailsStore.hasError;

  readonly trophySuites = this.suiteStore.suites;
  readonly totalSuites = this.suiteStore.total;
  readonly isLoadingSuites = this.suiteStore.isLoading;
  readonly hasErrorSearchingSuites = this.suiteStore.hasError;

  readonly trophies = this.trophyStore.trophies;
  readonly totalTrophies = this.trophyStore.total;
  readonly isLoadingTrophies = this.trophyStore.isLoading;
  readonly hasErrorSearchingTrophies = this.trophyStore.isError;

  constructor() {
    this.playerId = this.route.snapshot.paramMap.get('playerId');
    if (this.playerId === '') {
      this.navigator.goToErrorPage();
      return;
    }
  }

  ngOnInit(): void {
    this.detailsStore.retrieve(this.playerId);
    this.suiteStore.init(this.playerId);
    this.trophyStore.init(this.playerId);
    this.backgroundImageService.usePlayerLastGameBackground(this.playerId);
  }

  ngOnDestroy(): void {
    this.detailsStore.reset();
    this.suiteStore.reset();
    this.trophyStore.reset();
  }

  navigateToPlayerSuitePage(event: string): void {
    // TODO: Suite page ?
    // const playerId = this.playerId;
    // if (playerId === null) return;
    // this.navigator.goToTrophySuitePage(event.trophySuiteId, event.gameId, playerId);
  }

  loadMoreTrophySuites(): void {
    this.suiteStore.loadMore();
  }

  loadMoreTrophies(): void {
    this.trophyStore.loadMore();
  }

  deletePlayer(): void {
    this.deleteService.deleteProfile(this.playerId);
  }
}
