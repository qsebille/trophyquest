import {Component, computed, input} from '@angular/core';
import {TrophyCountPerType} from '../../models/dto/trophy-count-per-type';
import {MatIconModule} from '@angular/material/icon';
import {NgOptimizedImage} from '@angular/common';

@Component({
    selector: 'tq-trophy-count-displayer',
    imports: [
        MatIconModule,
        NgOptimizedImage,
    ],
    templateUrl: './trophy-count-displayer.component.html',
    styleUrl: './trophy-count-displayer.component.scss',
})
export class TrophyCountDisplayerComponent {
    readonly trophyCount = input.required<TrophyCountPerType>();
    readonly labelOrientation = input.required<'horizontal' | 'vertical'>();
    readonly iconSizePx = input<number>(32);
    readonly textSizePx = input<number>(20);

    readonly flexDirection = computed(() => this.labelOrientation() === 'horizontal' ? 'row' : 'column');
    readonly isLabelHorizontal = computed(() => this.labelOrientation() === 'horizontal');
}
