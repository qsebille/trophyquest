import {Component, computed, input, output} from '@angular/core';
import {ErrorMessageComponent} from "../../../core/components/error-message/error-message.component";
import {HomeStats} from "../../../core/models/dto/home-stats";
import {LoadingStatus} from "../../../core/models/loading-status.enum";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {SpinnerContainerComponent} from "../../../core/components/spinner-container/spinner-container.component";

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
    readonly stats = input.required<HomeStats>();
    readonly status = input<LoadingStatus>(LoadingStatus.NONE);

    readonly clickOnPlayers = output();

    readonly isLoading = computed(() => this.status() === LoadingStatus.LOADING);
    readonly hasFailed = computed(() => this.status() === LoadingStatus.ERROR);

    readonly statsAsList = computed(() => {
        return [
            {total: this.stats().totalPlayers, recentCount: this.stats().recentPlayers, label: 'players'},
            {total: this.stats().totalGames, recentCount: this.stats().recentGames, label: 'games'},
            {total: this.stats().totalTrophies, recentCount: this.stats().recentTrophies, label: 'trophies'},
        ]
    });
}
