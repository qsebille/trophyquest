import {Player} from "./player";
import {EarnedTrophy} from "../trophy/earned-trophy";

export interface TopRecentPlayerRow {
    player: Player;
    recentTrophyCount: number;
    lastTrophies: EarnedTrophy[];
}