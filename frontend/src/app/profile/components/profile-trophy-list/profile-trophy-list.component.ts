import {Component, input, output} from '@angular/core';
import {ProfileTrophyCardComponent} from "../profile-trophy-card/profile-trophy-card.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {EarnedTrophySearchItem} from "../../../core/api/dtos/trophy/earned-trophy-search-item";

@Component({
  selector: 'tq-profile-trophy-list',
  imports: [
    MatProgressSpinnerModule,
    ProfileTrophyCardComponent,
  ],
  templateUrl: './profile-trophy-list.component.html',
  styleUrl: './profile-trophy-list.component.scss',
})
export class ProfileTrophyListComponent {
  readonly trophies = input<EarnedTrophySearchItem[]>([]);
  readonly hasMoreTrophiesToLoad = input<boolean>(false);
  readonly loadMoreTrophies = output();
}
