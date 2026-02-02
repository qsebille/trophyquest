import {Component, computed, OnInit, signal} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {LoadingStatus} from "../../../core/models/loading-status.enum";
import {ErrorMessageComponent} from "../../../core/components/error-message/error-message.component";
import {TrophyFilters} from "../../../core/models/filters/trophy-filters";
import {TrophySuiteSummaryComponent} from "../trophy-suite-summary/trophy-suite-summary.component";
import {TrophySuiteTrophyListComponent} from "../trophy-suite-trophy-list/trophy-suite-trophy-list.component";
import {TrophySuiteTrophyFiltersComponent} from "../trophy-suite-trophy-filters/trophy-suite-trophy-filters.component";
import {TrophySuiteStoreService} from "../../stores/trophy-suite-store.service";
import {SpinnerContainerComponent} from "../../../core/components/spinner-container/spinner-container.component";

@Component({
    imports: [
        ErrorMessageComponent,
        TrophySuiteSummaryComponent,
        TrophySuiteTrophyListComponent,
        TrophySuiteTrophyFiltersComponent,
        SpinnerContainerComponent,
    ],
    templateUrl: './trophy-suite-page.component.html',
    styleUrl: './trophy-suite-page.component.scss',
})
export class TrophySuitePageComponent implements OnInit {
    private readonly _trophySuiteId: string;
    private readonly _playerId: string | null;

    readonly trophyFilters = signal<TrophyFilters>({
        showHidden: false,
        earned: 'all',
    });

    constructor(
        private readonly _route: ActivatedRoute,
        private readonly _trophySuiteStore: TrophySuiteStoreService,
    ) {
        this._trophySuiteId = this._route.snapshot.paramMap.get('trophySuiteId') ?? '';
        this._playerId = this._route.snapshot.queryParamMap.get('playerId');
    }

    readonly trophySuite = computed(() => this._trophySuiteStore.trophySuite());
    readonly trophies = computed(() => this._trophySuiteStore.trophies());
    readonly isLoading = computed(() => this._trophySuiteStore.status() === LoadingStatus.LOADING);
    readonly hasFailed = computed(() => this._trophySuiteStore.status() === LoadingStatus.ERROR);
    readonly hasPlayerData = computed(() => this._playerId !== null);

    ngOnInit(): void {
        this._trophySuiteStore.reset();
        this.loadData();
    }

    loadData(): void {
        this._trophySuiteStore.retrieve(this._trophySuiteId, this._playerId);
    }

    toggleShowHiddenTrophies($event: boolean): void {
        this.trophyFilters.update(f => ({...f, showHidden: $event}));
    }

    toggleEarnedFilter($event: 'all' | 'earned' | 'notEarned'): void {
        this.trophyFilters.update(f => ({...f, earned: $event}));
    }
}
