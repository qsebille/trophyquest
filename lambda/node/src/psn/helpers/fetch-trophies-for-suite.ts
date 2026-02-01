import {AuthorizationPayload} from "psn-api";
import {TrophySuite} from "../../models/trophy-suite.js";
import {buildTrophyUniqueId, Trophy} from "../../models/trophy.js";
import {buildTrophySuiteGroupUniqueId} from "../../models/trophy-suite-group.js";

export async function fetchTrophiesForSuite(
    auth: AuthorizationPayload,
    trophySuite: TrophySuite,
): Promise<Trophy[]> {
    const {getTitleTrophies} = await import("psn-api");

    const options = {npServiceName: trophySuite.npServiceName};
    const titleTrophies = await getTitleTrophies(auth, trophySuite.id, "all", options);

    return titleTrophies.trophies.map(trophy => {
        const rank = trophy.trophyId;
        return {
            id: buildTrophyUniqueId(trophySuite.id, rank),
            trophySuiteId: trophySuite.id,
            groupId: buildTrophySuiteGroupUniqueId(trophySuite.id, trophy.trophyGroupId ?? 'default'),
            rank: rank,
            title: trophy.trophyName ?? '',
            detail: trophy.trophyDetail ?? '',
            isHidden: trophy.trophyHidden,
            trophyType: trophy.trophyType,
            iconUrl: trophy.trophyIconUrl ?? '',
        }
    });
}