import {buildTrophyQuestPlayer, TrophyQuestPlayer} from "./player";
import {buildTrophyQuestGroups, TrophyQuestGroup} from "./group";
import {buildTrophyQuestSuites, TrophyQuestSuite} from "./suite";
import {buildTrophyQuestTrophies, TrophyQuestTrophy} from "./trophy";
import {buildTrophyQuestPlayedSuites, TrophyQuestPlayedSuite} from "./played-suite";
import {buildTrophyQuestEarnedTrophies, TrophyQuestEarnedTrophy} from "./earned-trophy";
import {PsnPlayer} from "../psn/player";
import {PsnPlayedSuite} from "../psn/played-suite";
import {PsnEarnedTrophy} from "../psn/earned-trophy";
import {PsnGroup} from "../psn/group";
import {PsnTrophy} from "../psn/trophy";

export interface TrophyQuestData {
    players: TrophyQuestPlayer[]
    suites: TrophyQuestSuite[]
    groups: TrophyQuestGroup[]
    trophies: TrophyQuestTrophy[]
    playedSuites: TrophyQuestPlayedSuite[]
    earnedTrophies: TrophyQuestEarnedTrophy[]
}

export function buildTrophyquestPlayerData(
    accountId: string,
    players: PsnPlayer[],
    playedSuites: PsnPlayedSuite[],
    trophies: PsnTrophy[],
    earnedTrophies: PsnEarnedTrophy[],
    groups: PsnGroup[],
) {
    return {
        players: buildTrophyQuestPlayer(players),
        suites: buildTrophyQuestSuites(playedSuites),
        groups: buildTrophyQuestGroups(groups),
        trophies: buildTrophyQuestTrophies(trophies),
        playedSuites: buildTrophyQuestPlayedSuites(accountId, playedSuites),
        earnedTrophies: buildTrophyQuestEarnedTrophies(accountId, earnedTrophies),
    } as TrophyQuestData
}