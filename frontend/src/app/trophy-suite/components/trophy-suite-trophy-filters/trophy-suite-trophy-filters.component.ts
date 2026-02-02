import {Component, input, output} from '@angular/core';
import {TrophyFilters} from "../../../core/models/filters/trophy-filters";
import {MatRadioModule} from "@angular/material/radio";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {FormsModule} from "@angular/forms";

@Component({
    selector: 'tq-trophy-suite-trophy-filters',
    imports: [
        MatSlideToggleModule,
        MatRadioModule,
        FormsModule,
    ],
    templateUrl: './trophy-suite-trophy-filters.component.html',
    styleUrl: './trophy-suite-trophy-filters.component.scss',
})
export class TrophySuiteTrophyFiltersComponent {
    readonly filters = input<TrophyFilters>({
        showHidden: false,
        earned: 'all',
    });
    readonly showEarnedTrophyFilter = input<boolean>(true);

    readonly filterChange = output<'all' | 'earned' | 'notEarned'>();
    readonly showHiddenTrophyChange = output<boolean>();

    private _showHiddenTrophies = false;

    changeFilter(newFilter: 'all' | 'earned' | 'notEarned') {
        this.filterChange.emit(newFilter);
    }

    hiddenFilterChanges() {
        this._showHiddenTrophies = !this._showHiddenTrophies;
        this.showHiddenTrophyChange.emit(this._showHiddenTrophies);
    }
}
