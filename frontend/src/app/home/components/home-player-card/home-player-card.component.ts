import {Component, input, output} from '@angular/core';
import {Player} from "../../../core/api/dtos/player/player";
import {DecimalPipe, NgOptimizedImage} from "@angular/common";

@Component({
    selector: 'tq-home-player-card',
    imports: [
        NgOptimizedImage,
        DecimalPipe
    ],
    templateUrl: './home-player-card.component.html',
    styleUrl: './home-player-card.component.scss',
})
export class HomePlayerCardComponent {
    readonly player = input.required<Player>();
    readonly trophyCount = input.required<number>();
    readonly clickOnPseudo = output();
}
