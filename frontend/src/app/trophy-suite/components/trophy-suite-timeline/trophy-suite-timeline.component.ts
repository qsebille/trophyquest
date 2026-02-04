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

        const firstTrophyDate = new Date(trophies[0].earnedAt).getTime();
        const lastTrophyDate = new Date(trophies[trophies.length - 1].earnedAt).getTime();
        const trophyDuration = lastTrophyDate - firstTrophyDate;

        // Determine step and format based on trophy duration
        const ONE_HOUR = 3600000;
        const ONE_DAY = 86400000;
        const ONE_MONTH = 2592000000;
        const ONE_YEAR = 31536000000;

        let step: number;
        let format: string;

        if (trophyDuration <= ONE_DAY * 2) {
            step = ONE_HOUR;
            format = 'MMM d HH:mm';
        } else if (trophyDuration <= ONE_MONTH) {
            step = ONE_DAY;
            format = 'MMM d';
        } else if (trophyDuration <= ONE_YEAR * 2) {
            step = ONE_MONTH;
            format = 'MMM y';
        } else {
            step = ONE_YEAR;
            format = 'y';
        }

        // Align timeline start and end to the beginning/end of the units
        let startDate = new Date(firstTrophyDate);
        if (step === ONE_HOUR) startDate.setMinutes(0, 0, 0);
        else if (step === ONE_DAY) startDate.setHours(0, 0, 0, 0);
        else if (step === ONE_MONTH) startDate.setDate(1);
        else if (step === ONE_YEAR) { startDate.setMonth(0, 1); startDate.setHours(0, 0, 0, 0); }

        let firstDate = startDate.getTime();

        let endDate = new Date(lastTrophyDate);
        if (step === ONE_HOUR) { endDate.setMinutes(0, 0, 0); endDate.setTime(endDate.getTime() + ONE_HOUR); }
        else if (step === ONE_DAY) { endDate.setHours(0, 0, 0, 0); endDate.setTime(endDate.getTime() + ONE_DAY); }
        else if (step === ONE_MONTH) { endDate.setDate(1); endDate.setMonth(endDate.getMonth() + 1); }
        else if (step === ONE_YEAR) { endDate.setMonth(0, 1); endDate.setFullYear(endDate.getFullYear() + 1); endDate.setHours(0, 0, 0, 0); }

        let lastDate = endDate.getTime();
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

        // Calculate Intervals for the scale
        const intervals: { start: number, width: number, label: string }[] = [];
        if (duration > 0) {
            let time = firstDate;
            while (time < lastDate) {
                let nextTime: number;
                if (step === ONE_MONTH) {
                    const d = new Date(time);
                    d.setMonth(d.getMonth() + 1);
                    nextTime = d.getTime();
                } else if (step === ONE_YEAR) {
                    const d = new Date(time);
                    d.setFullYear(d.getFullYear() + 1);
                    nextTime = d.getTime();
                } else {
                    nextTime = time + step;
                }

                const startPos = Math.max(0, ((time - firstDate) / duration) * 100);
                const endPos = Math.min(100, ((nextTime - firstDate) / duration) * 100);

                if (endPos > startPos) {
                    // Format label
                    let label = new DatePipe('en-US').transform(time, format) || '';

                    intervals.push({
                        start: startPos,
                        width: endPos - startPos,
                        label: label
                    });
                }
                time = nextTime;
            }
        }

        return {
            firstDate,
            lastDate,
            duration,
            items,
            intervals
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
