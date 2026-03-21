import {AuthorizationPayload, UserTitlesResponse} from "psn-api";
import {PlayedTrophySuite} from "../../models/played-trophy-suite.js";

const PSN_TITLE_BATCH_SIZE: number = 200

export async function fetchTrophySuites(
    auth: AuthorizationPayload,
    accountId: string,
    limitDate?: Date,
): Promise<PlayedTrophySuite[]> {
    const {getUserTitles} = await import("psn-api");

    const startTime = Date.now();

    let offset = 0;
    const result: PlayedTrophySuite[] = [];
    while (true) {
        const options = {limit: PSN_TITLE_BATCH_SIZE, offset};
        const userTitlesResponse: UserTitlesResponse = await getUserTitles(auth, accountId, options);
        const batchTrophySuites = userTitlesResponse.trophyTitles
            .filter(trophyTitle => {
                if (!limitDate) return true;
                return new Date(trophyTitle.lastUpdatedDateTime) > limitDate;
            })
            .map(trophyTitle => {
                return {
                    trophySuite: {
                        id: trophyTitle.npCommunicationId,
                        name: trophyTitle.trophyTitleName,
                        version: trophyTitle.trophySetVersion,
                        iconUrl: trophyTitle.trophyTitleIconUrl,
                        platforms: trophyTitle.trophyTitlePlatform,
                        hasTrophyGroups: trophyTitle.hasTrophyGroups,
                        npServiceName: trophyTitle.npServiceName,
                    },
                    playerId: accountId,
                    lastPlayedAt: trophyTitle.lastUpdatedDateTime,
                }
            });
        result.push(...batchTrophySuites);
        if (userTitlesResponse.nextOffset === undefined || userTitlesResponse.nextOffset === null) break;
        offset = userTitlesResponse.nextOffset;
    }

    const duration = (Date.now() - startTime) / 1000;
    console.info(`Fetched ${result.length} trophy suites in ${duration.toFixed(2)} s`);

    return result;
}