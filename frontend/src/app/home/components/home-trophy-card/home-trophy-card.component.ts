import {Component, input, output} from '@angular/core';
import {DatePipe, NgOptimizedImage} from '@angular/common';
import {EarnedTrophy} from "../../../core/api/dtos/trophy/earned-trophy";

@Component({
    selector: 'tq-home-trophy-card',
    imports: [
        NgOptimizedImage,
        DatePipe
    ],
    templateUrl: './home-trophy-card.component.html',
    styleUrl: './home-trophy-card.component.scss',
})
export class HomeTrophyCardComponent {
    readonly trophy = input.required<EarnedTrophy>();
    readonly clickOnGameTitle = output();
}
