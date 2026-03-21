import {Pool, PoolClient} from "pg";
import {EditionTrophySuiteLink} from "../models/edition-trophy-suite-link.js";
import {insertIntoPsnGameTable} from "./insert/insert-into-psn-game-table.js";
import {PlayedGame} from "../models/played-game.js";
import {PlayedEdition} from "../models/played-edition.js";
import {TrophySuiteGroup} from "../models/trophy-suite-group.js";
import {EarnedTrophy} from "../models/earned-trophy.js";
import {Trophy} from "../models/trophy.js";
import {PlayedTrophySuite} from "../models/played-trophy-suite.js";
import {Player} from "../models/player.js";
import {insertIntoPsnPlayerTable} from "./insert/insert-into-psn-player-table.js";
import {insertIntoPsnPlayedGameTable} from "./insert/insert-into-psn-played-game-table.js";
import {insertIntoPsnGameImageTable} from "./insert/insert-into-psn-game-image-table.js";
import {insertIntoPsnEditionTable} from "./insert/insert-into-psn-edition-table.js";
import {insertIntoPsnPlayedEditionTable} from "./insert/insert-into-psn-played-edition-table.js";
import {insertIntoPsnTrophySuiteTable} from "./insert/insert-into-psn-trophy-suite-table.js";
import {insertIntoPsnEditionTrophySuiteTable} from "./insert/insert-into-psn-edition-trophy-suite-table.js";
import {insertIntoPsnTrophySuiteGroupTable} from "./insert/insert-into-psn-trophy-suite-group-table.js";
import {insertIntoPsnPlayedTrophySuiteTable} from "./insert/insert-into-psn-played-trophy-suite-table.js";
import {insertIntoPsnTrophyTable} from "./insert/insert-into-psn-trophy-table.js";
import {insertIntoPsnEarnedTrophyTable} from "./insert/insert-into-psn-earned-trophy-table.js";

export async function insertIntoTrophyquestDatabase(
    pool: Pool,
    players: Player[],
    playedGames: PlayedGame[],
    playedEditions: PlayedEdition[],
    playedTrophySuites: PlayedTrophySuite[],
    editionTrophySuiteLinks: EditionTrophySuiteLink[],
    trophySuiteGroups: TrophySuiteGroup[],
    trophies: Trophy[],
    earnedTrophies: EarnedTrophy[],
): Promise<void> {
    const client: PoolClient = await pool.connect();
    try {
        await client.query('BEGIN')
        const playerInsert = await insertIntoPsnPlayerTable(client, players)
        const gameInsert = await insertIntoPsnGameTable(client, playedGames.map(pg => pg.game))
        const playedGameInsert = await insertIntoPsnPlayedGameTable(client, playedGames)
        const gameImageInsert = await insertIntoPsnGameImageTable(client, playedGames.map(pg => pg.game))
        const editionInsert = await insertIntoPsnEditionTable(client, playedEditions.map(pe => pe.edition))
        const playedEditionInsert = await insertIntoPsnPlayedEditionTable(client, playedEditions)
        const trophySuiteInsert = await insertIntoPsnTrophySuiteTable(client, playedTrophySuites.map(pts => pts.trophySuite))
        const linkInsert = await insertIntoPsnEditionTrophySuiteTable(client, editionTrophySuiteLinks)
        const groupInsert = await insertIntoPsnTrophySuiteGroupTable(client, trophySuiteGroups)
        const playedTrophySuiteInsert = await insertIntoPsnPlayedTrophySuiteTable(client, playedTrophySuites)
        const trophyInsert = await insertIntoPsnTrophyTable(client, trophies)
        const earnedTrophyInsert = await insertIntoPsnEarnedTrophyTable(client, earnedTrophies)
        await client.query('COMMIT')

        logInsertResult('app.psn_player', playerInsert);
        logInsertResult('app.psn_game', gameInsert);
        logInsertResult('app.psn_played_game', playedGameInsert);
        logInsertResult('app.psn_game_image', gameImageInsert);
        logInsertResult('app.psn_edition', editionInsert);
        logInsertResult('app.psn_played_edition', playedEditionInsert);
        logInsertResult('app.psn_trophy_suite', trophySuiteInsert);
        logInsertResult('app.psn_edition_trophy_suite', linkInsert);
        logInsertResult('app.psn_trophy_suite_group', groupInsert);
        logInsertResult('app.psn_played_trophy_suite', playedTrophySuiteInsert);
        logInsertResult('app.psn_trophy', trophyInsert);
        logInsertResult('app.psn_earned_trophy', earnedTrophyInsert);
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
}

function logInsertResult(
    tableName: string,
    result: { rowsInserted: number, rowsIgnored: number }
) {
    console.info(`Postgres: Inserted ${result.rowsInserted} lines into ${tableName} table ${result.rowsIgnored > 0 ? `(${result.rowsIgnored} ignored)` : ''}`);
}
