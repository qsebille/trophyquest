import {AuthorizationPayload} from "psn-api";
import {TrophySuite} from "../../models/trophy-suite.js";
import {TrophySuiteGroup} from "../../models/trophy-suite-group.js";

export async function fetchGroupsForSuite(
    auth: AuthorizationPayload,
    trophySuite: TrophySuite,
): Promise<TrophySuiteGroup[]> {
    const {getTitleTrophyGroups} = await import("psn-api");

    const options = {npServiceName: trophySuite.npServiceName};
    const groupResponse = await getTitleTrophyGroups(auth, trophySuite.id, options);

    return groupResponse.trophyGroups.map(g => ({
        trophySuiteId: trophySuite.id,
        psnId: g.trophyGroupId,
        name: g.trophyGroupName
    }));
}