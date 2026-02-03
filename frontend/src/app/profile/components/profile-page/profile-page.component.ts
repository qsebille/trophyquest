import {Component, computed, OnInit} from '@angular/core';
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
import {AddPlayerStatus} from "../../../core/models/add-player-status.enum";

@Component({
    selector: 'tq-profile-page',
    imports: [
        ProfileSummaryComponent,
        MatProgressSpinnerModule,
        ErrorMessageComponent,
        ProfileTrophyListComponent,
        ProfileTrophySuiteListComponent,
    ],
    templateUrl: './profile-page.component.html',
    styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent implements OnInit {
    playerId!: string | null;

    constructor(
        private readonly _route: ActivatedRoute,
        private readonly _navigator: NavigatorService,
        private readonly _profileSummaryStore: ProfileSummaryStore,
        private readonly _profileTrophySuiteListStore: ProfileTrophySuiteListStoreService,
        private readonly _profileTrophiesStore: ProfileTrophiesStore,
        private readonly _playerApiService: PlayerApiService,
    ) {
    }

    readonly player = computed(() => this._profileSummaryStore.player());
    readonly playerStats = computed(() => this._profileSummaryStore.playerStats());
    readonly summaryStatus = computed(() => this._profileSummaryStore.status());

    readonly trophySuites = computed(() => this._profileTrophySuiteListStore.trophySuites());
    readonly trophySuiteListStatus = computed(() => this._profileTrophySuiteListStore.status());

    readonly trophies = computed(() => this._profileTrophiesStore.trophies());
    readonly trophiesStatus = computed(() => this._profileTrophiesStore.status());

    readonly hasFailedLoading = computed(() => this._profileSummaryStore.status() === LoadingStatus.ERROR);

    ngOnInit(): void {
        this.playerId = this._route.snapshot.paramMap.get('playerId');
        this.loadProfileData();
    }

    loadProfileData(): void {
        this._profileSummaryStore.reset();
        this._profileSummaryStore.retrieve(this.playerId);
        this._profileTrophySuiteListStore.reset();
        this._profileTrophySuiteListStore.search(this.playerId);
        this._profileTrophiesStore.reset();
        this._profileTrophiesStore.search(this.playerId);
    }

    navigateToPlayerTrophySuitePage(trophySuiteId: string): void {
        if (this.playerId === null) {
            console.error('Player ID is null');
        } else {
            this._navigator.goToPlayerTrophySuitePage(trophySuiteId, this.playerId);
        }
    }

    loadMoreGames(): void {
        this._profileTrophySuiteListStore.loadMore(this.playerId);
    }

    loadMoreTrophies(): void {
        this._profileTrophiesStore.loadMore(this.playerId);
    }

    deletePlayer(): void {
        console.log(`Deleting player ${this.playerId}...`);
        this._playerApiService.deletePlayer(this.playerId ?? "").pipe(
            tap(() => {
                console.log(`Player ${this.playerId} deleted`);
                this._navigator.goToPlayersPage();
            }),
            catchError((error) => {
                console.error(`Failed to delete player ${this.playerId}`, error);
                return EMPTY;
            })
        ).subscribe();
    }
}
