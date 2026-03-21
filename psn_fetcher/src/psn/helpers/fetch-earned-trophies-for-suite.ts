import {AuthorizationPayload} from "psn-api";
import {TrophySuite} from "../../models/trophy-suite.js";
import {EarnedTrophy} from "../../models/earned-trophy.js";
import {buildTrophyUniqueId} from "../../models/trophy.js";


export async function fetchEarnedTrophiesForSuite(
    auth: AuthorizationPayload,
    accountId: string,
    trophySuite: TrophySuite,
): Promise<EarnedTrophy[]> {
    const {getUserTrophiesEarnedForTitle} = await import("psn-api");

    let options = {npServiceName: trophySuite.npServiceName};
    const userTrophiesEarned = await getUserTrophiesEarnedForTitle(auth, accountId, trophySuite.id, "all", options);

    return userTrophiesEarned.trophies
        .filter(trophy => trophy.earnedDateTime !== undefined)
        .map(trophy => {
            const rank = trophy.trophyId;
            return {
                trophyId: buildTrophyUniqueId(trophySuite.id, rank),
                trophyRank: rank,
                playerId: accountId,
                earnedAt: trophy.earnedDateTime ?? '',
            }
        });
}