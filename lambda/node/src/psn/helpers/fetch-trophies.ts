import {AuthorizationPayload} from "psn-api";
import {PlayedTrophySuite} from "../../models/played-trophy-suite.js";
import {mapWithConcurrency} from "../.././config/map-with-concurrency.js";
import {fetchTrophiesForSuite} from "./fetch-trophies-for-suite.js";
import {Trophy} from "../../models/trophy.js";
import {EarnedTrophy} from "../../models/earned-trophy.js";
import {fetchEarnedTrophiesForSuite} from "./fetch-earned-trophies-for-suite.js";
import {fetchGroupsForSuite} from "./fetch-groups-for-suite.js";
import {TrophySuiteGroup} from "../../models/trophy-suite-group.js";

export type TrophyDataResponse = {
    trophies: Trophy[];
    earnedTrophies: EarnedTrophy[];
    groups: TrophySuiteGroup[];
};

export async function fetchTrophies(
    auth: AuthorizationPayload,
    accountId: string,
    trophySuites: PlayedTrophySuite[],
    concurrency: number,
): Promise<TrophyDataResponse> {
    const startTime = Date.now();
    const safeConcurrency = Math.max(1, concurrency);

    const perSetResults: TrophyDataResponse[] = await mapWithConcurrency(
        trophySuites,
        safeConcurrency,
        async (playedTrophySuite): Promise<TrophyDataResponse> => {
            const [trophies, earnedTrophies, groups] = await Promise.all([
                fetchTrophiesForSuite(auth, playedTrophySuite.trophySuite),
                fetchEarnedTrophiesForSuite(auth, accountId, playedTrophySuite.trophySuite),
                fetchGroupsForSuite(auth, playedTrophySuite.trophySuite),
            ]);

            return {trophies, earnedTrophies, groups};
        }
    );

    const trophies = perSetResults.flatMap(r => r.trophies);
    const earnedTrophies = perSetResults.flatMap(r => r.earnedTrophies);
    const groups = perSetResults.flatMap(r => r.groups);

    const duration = (Date.now() - startTime) / 1000;
    console.info(`Fetched ${trophies.length} trophies, ${earnedTrophies.length} earned trophies and ${groups.length} groups in ${duration.toFixed(2)} s`);

    return {trophies, earnedTrophies, groups};
}