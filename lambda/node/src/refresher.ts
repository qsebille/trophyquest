import {buildPostgresPool} from "./postgres/utils/build-postgres-pool.js";
import {Pool} from "pg";
import {getAuthorizationPayload} from "./auth/psn-auth-tokens.js";
import {getMandatoryParam} from "././config/get-mandatory-param.js";
import {AuthorizationPayload} from "psn-api";
import {selectProfiles} from "./postgres/select/select-profiles.js";
import {Player} from "./models/player.js";
import {getUserProfile} from "./psn/helpers/get-user-profile.js";
import {fetchUserGamesAndEditions} from "./psn/helpers/fetch-user-games-and-editions.js";
import {fetchEditionTrophySuiteLinks} from "./psn/helpers/fetch-edition-trophy-suite-links.js";
import {fetchTrophySuites} from "./psn/helpers/fetch-trophy-suites.js";
import {fetchTrophies} from "./psn/helpers/fetch-trophies.js";
import {insertIntoTrophyquestDatabase} from "./postgres/insert-into-trophyquest-database.js";
import {PlayedGame} from "./models/played-game.js";
import {PlayedEdition} from "./models/played-edition.js";
import {PlayedTrophySuite} from "./models/played-trophy-suite.js";
import {EditionTrophySuiteLink} from "./models/edition-trophy-suite-link.js";
import {TrophySuiteGroup} from "./models/trophy-suite-group.js";
import {Trophy} from "./models/trophy.js";
import {EarnedTrophy} from "./models/earned-trophy.js";


async function runRefresher(): Promise<void> {
    const startTime = Date.now();
    console.info("PSN Refresher: Start");

    const npsso: string = getMandatoryParam('NPSSO');
    const concurrency: number = Number(getMandatoryParam('CONCURRENCY'));
    const pool: Pool = buildPostgresPool();

    try {
        // Auth
        const auth: AuthorizationPayload = await getAuthorizationPayload(npsso);

        // List of profiles with the last earned trophy timestamp to refresh
        const profiles = await selectProfiles(pool);

        const playerList: Player[] = [];
        const playedGameList: PlayedGame[] = [];
        const playedEditionList: PlayedEdition[] = [];
        const playedTrophySuiteList: PlayedTrophySuite[] = [];
        const editionTrophySuiteLinkList: EditionTrophySuiteLink[] = [];
        const trophySuiteGroupList: TrophySuiteGroup[] = [];
        const trophyList: Trophy[] = [];
        const earnedTrophyList: EarnedTrophy[] = [];

        for (let profile of profiles) {
            const player: Player = await getUserProfile(auth, profile.pseudo);
            const accountId: string = player.id;
            console.info(`Refreshing PSN data for profile ${profile.pseudo}`);

            // Fetch data from PSN API (from last earned trophy timestamp)
            const playedGamesAndEditions = await fetchUserGamesAndEditions(auth, accountId, profile.lastPlayedGame);
            const editionTrophySuiteLinks = await fetchEditionTrophySuiteLinks(auth, accountId, playedGamesAndEditions.editions)
            const playedTrophySuites = await fetchTrophySuites(auth, accountId, profile.lastPlayedTrophySuite);
            const userTrophyData = await fetchTrophies(auth, accountId, playedTrophySuites, concurrency);

            playerList.push(player);
            playedGameList.push(...playedGamesAndEditions.games);
            playedEditionList.push(...playedGamesAndEditions.editions);
            playedTrophySuiteList.push(...playedTrophySuites);
            editionTrophySuiteLinkList.push(...editionTrophySuiteLinks);
            trophySuiteGroupList.push(...userTrophyData.groups);
            trophyList.push(...userTrophyData.trophies);
            earnedTrophyList.push(...userTrophyData.earnedTrophies);
        }

        // Insert data into database
        await insertIntoTrophyquestDatabase(
            pool,
            playerList,
            playedGameList,
            playedEditionList,
            playedTrophySuiteList,
            editionTrophySuiteLinkList,
            trophySuiteGroupList,
            trophyList,
            earnedTrophyList
        )

        console.info("PSN Refresher : Success");
    } finally {
        const durationSeconds = (Date.now() - startTime) / 1000;
        console.info(`Total processing time: ${durationSeconds.toFixed(2)} s`);
        await pool.end();
    }
}

export const handler = async (
    _event: any = {},
    _context: any = {}
): Promise<void> => {
    await runRefresher();
};

if (!process.env.LAMBDA_TASK_ROOT) {
    runRefresher().catch((e) => {
        console.error(e);
        process.exitCode = 1;
    });
}