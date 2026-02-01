import {buildPostgresPool} from "./postgres/utils/build-postgres-pool.js";
import {Pool} from "pg";
import {getAuthorizationPayload} from "./auth/psn-auth-tokens.js";
import {getMandatoryParam} from "././config/get-mandatory-param.js";
import {AuthorizationPayload} from "psn-api";
import {getUserProfile} from "./psn/helpers/get-user-profile.js";
import {Player} from "./models/player.js";
import {fetchUserGamesAndEditions} from "./psn/helpers/fetch-user-games-and-editions.js";
import {fetchEditionTrophySuiteLinks} from "./psn/helpers/fetch-edition-trophy-suite-links.js";
import {fetchTrophySuites} from "./psn/helpers/fetch-trophy-suites.js";
import {fetchTrophies} from "./psn/helpers/fetch-trophies.js";
import {insertIntoTrophyquestDatabase} from "./postgres/insert-into-trophyquest-database.js";


async function runFetcher(): Promise<void> {
    const startTime = Date.now();
    console.info("PSN Fetcher: Start");

    const npsso: string = getMandatoryParam('NPSSO');
    const profileName: string = getMandatoryParam('PROFILE_NAME');
    const concurrency: number = Number(getMandatoryParam('CONCURRENCY'));
    const pool: Pool = buildPostgresPool();
    console.info(`Fetching PSN data for profile ${profileName}`);

    try {
        // Auth + user info
        const auth: AuthorizationPayload = await getAuthorizationPayload(npsso);
        const player: Player = await getUserProfile(auth, profileName);
        const accountId: string = player.id;

        // Fetch data from PSN API
        const playedGamesAndEditions = await fetchUserGamesAndEditions(auth, accountId);
        const editionTrophySuiteLinks = await fetchEditionTrophySuiteLinks(auth, accountId, playedGamesAndEditions.editions)
        const playedTrophySuites = await fetchTrophySuites(auth, accountId);
        const userTrophyData = await fetchTrophies(auth, accountId, playedTrophySuites, concurrency);

        // Insert data into database
        await insertIntoTrophyquestDatabase(
            pool,
            [player],
            playedGamesAndEditions.games,
            playedGamesAndEditions.editions,
            playedTrophySuites,
            editionTrophySuiteLinks,
            userTrophyData.groups,
            userTrophyData.trophies,
            userTrophyData.earnedTrophies
        )

        console.info("PSN Fetcher : Success");
    } finally {
        const durationSeconds = (Date.now() - startTime) / 1000;
        console.info(`Total processing time: ${durationSeconds.toFixed(2)} s`);
        await pool.end();
    }
}

export const handler = async (
    event: any = {},
    _context: any = {}
): Promise<void> => {
    if (event.profileName) {
        process.env.PROFILE_NAME = event.profileName;
    }
    await runFetcher();
};

if (!process.env.LAMBDA_TASK_ROOT) {
    runFetcher().catch((e) => {
        console.error(e);
        process.exitCode = 1;
    });
}
