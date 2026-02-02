import {Component, computed, input} from '@angular/core';
import {TrophyFilters} from "../../../core/models/filters/trophy-filters";
import {GameGroup} from "../../../core/models/trophy-suite/game-group";
import {TrophySuiteTrophyCardComponent} from "../trophy-suite-trophy-card/trophy-suite-trophy-card.component";
import {EarnedTrophy} from "../../../core/api/dtos/trophy/earned-trophy";

@Component({
    selector: 'tq-trophy-suite-trophy-list',
    imports: [
        TrophySuiteTrophyCardComponent,
    ],
    templateUrl: './trophy-suite-trophy-list.component.html',
    styleUrl: './trophy-suite-trophy-list.component.scss',
})
export class TrophySuiteTrophyListComponent {
    readonly trophies = input<EarnedTrophy[]>([]);
    readonly trophyFilters = input<TrophyFilters>({
        showHidden: false,
        earned: 'all',
    });

    private readonly _filteredTrophies = computed(() => {
        switch (this.trophyFilters().earned) {
            case 'all':
                return this.trophies();
            case 'earned':
                return this.trophies().filter(t => t.earnedAt !== null);
            case 'notEarned':
                return this.trophies().filter(t => t.earnedAt === null);
            default:
                return this.trophies();
        }
    });
    readonly groups = computed(() => this._computeGroups(this._filteredTrophies()));
    readonly baseGameTrophies = computed(() => this._filteredTrophies().filter(t => t.trophyGroupId === 'default'));
    readonly dlcs = computed(() => this._computeDlcGroups(this._filteredTrophies()));

    private _computeGroups(trophies: EarnedTrophy[]): GameGroup[] {
        const groups: GameGroup[] = [];
        trophies.forEach(t => {
            const group = groups.find(group => group.groupId === t.trophyGroupId);
            if (group === undefined) {
                groups.push({
                    groupId: t.trophyGroupId,
                    groupName: t.trophyGroupName,
                    trophies: [t],
                });
            }
            group?.trophies.push(t);
        });
        return groups;
    }

    private _computeDlcGroups(trophies: EarnedTrophy[]): GameGroup[] {
        const groups: GameGroup[] = [];
        trophies
            .filter(t => t.trophyGroupId !== 'default')
            .forEach(t => {
                const group = groups.find(group => group.groupName === t.trophyGroupId);
                if (group === undefined) {
                    groups.push({groupName: t.trophyGroupId, trophies: [t], groupId: '1'});
                }
                group?.trophies.push(t);
            });
        return groups;
    }
}
