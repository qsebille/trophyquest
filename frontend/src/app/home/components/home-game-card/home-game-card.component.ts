import {Component, input} from '@angular/core';
import {RecentGame} from "../../../core/api/dtos/game/recent-game";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";

@Component({
    selector: 'tq-home-game-card',
    imports: [
        MatIconModule,
        MatTooltipModule
    ],
    templateUrl: './home-game-card.component.html',
    styleUrl: './home-game-card.component.scss',
})
export class HomeGameCardComponent {
    readonly game = input.required<RecentGame>();
}
