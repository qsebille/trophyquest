import {Component, computed, input, signal} from '@angular/core';
import {TrophySuite} from "../../../core/api/dtos/trophy-suite/trophy-suite";
import {EarnedTrophy} from "../../../core/api/dtos/trophy/earned-trophy";
import {DatePipe, LowerCasePipe, NgOptimizedImage} from "@angular/common";

@Component({
    selector: 'tq-trophy-suite-timeline',
    imports: [
        DatePipe,
        NgOptimizedImage,
        LowerCasePipe
    ],
    templateUrl: './trophy-suite-timeline.component.html',
    styleUrl: './trophy-suite-timeline.component.scss',
})
export class TrophySuiteTimelineComponent {
    readonly trophySuite = input.required<TrophySuite>();
    readonly trophies = input<EarnedTrophy[]>([]);

    readonly selectedItem = signal<{ trophies: EarnedTrophy[], position: number } | null>(null);

    readonly sortedTrophies = computed(() => {
        return [...this.trophies()]
            .filter(t => t.earnedAt)
            .sort((a, b) => new Date(a.earnedAt).getTime() - new Date(b.earnedAt).getTime());
    });

    readonly timelineData = computed(() => {
        const trophies = this.sortedTrophies();
        if (trophies.length === 0) return null;

        const firstDate = new Date(trophies[0].earnedAt).getTime();
        const lastDate = new Date(trophies[trophies.length - 1].earnedAt).getTime();
        const duration = lastDate - firstDate;

        const THRESHOLD = 3; // 3%
        const items: { trophies: EarnedTrophy[], position: number }[] = [];

        trophies.forEach(t => {
            const position = duration === 0 ? 50 : ((new Date(t.earnedAt).getTime() - firstDate) / duration) * 100;
            const lastItem = items[items.length - 1];

            if (lastItem && (position - lastItem.position) < THRESHOLD) {
                lastItem.trophies.push(t);
            } else {
                items.push({
                    trophies: [t],
                    position
                });
            }
        });

        return {
            firstDate,
            lastDate,
            duration,
            items
        };
    });

    selectItem(item: { trophies: EarnedTrophy[], position: number }) {
        if (this.selectedItem() === item) {
            this.selectedItem.set(null);
        } else {
            this.selectedItem.set(item);
        }
    }
}
