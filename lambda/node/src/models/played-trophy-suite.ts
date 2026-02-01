import {TrophySuite} from "./trophy-suite.js";

export interface PlayedTrophySuite {
    trophySuite: TrophySuite,
    playerId: string,
    lastPlayedAt: string,
}