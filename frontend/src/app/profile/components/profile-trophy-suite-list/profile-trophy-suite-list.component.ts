import {Component, input, output} from '@angular/core';
import {ProfileTrophySuiteCardComponent} from "../profile-trophy-suite-card/profile-trophy-suite-card.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {PlayedTrophySuiteSearchElement} from "../../../core/api/dtos/trophy-suite/played-trophy-suite-search-element";

@Component({
  selector: 'tq-profile-trophy-suite-list',
  imports: [
    MatProgressSpinnerModule,
    ProfileTrophySuiteCardComponent,
  ],
  templateUrl: './profile-trophy-suite-list.component.html',
  styleUrl: './profile-trophy-suite-list.component.scss',
})
export class ProfileTrophySuiteListComponent {
  readonly trophySuites = input<PlayedTrophySuiteSearchElement[]>([]);
  readonly hasMoreTrophySuitesToLoad = input<boolean>(false);

  readonly clickOnGame = output<string>();
  readonly loadMoreGames = output();
}
