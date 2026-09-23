import {Pool, PoolClient} from "pg";
import {insertPlayers} from "./insert/psn-player";
import {insertSuites} from "./insert/psn-suite";
import {insertGroups} from "./insert/psn-group";
import {insertPlayedSuites} from "./insert/psn-played-suite";
import {insertTrophies} from "./insert/psn-trophy";
import {insertEarnedTrophies} from "./insert/psn-earned-trophy";
import {TrophyQuestData} from "../trophyquest/trophyquest-data";

export async function insertTrophyQuestData(
    pool: Pool,
    data: TrophyQuestData,
): Promise<void> {
    const client: PoolClient = await pool.connect();
    try {
        await client.query('BEGIN')
        const playerInsert = await insertPlayers(client, data.players)
        const suiteInsert = await insertSuites(client, data.suites)
        const groupInsert = await insertGroups(client, data.groups)
        const trophyInsert = await insertTrophies(client, data.trophies)
        const playedSuiteInsert = await insertPlayedSuites(client, data.playedSuites)
        const earnedTrophyInsert = await insertEarnedTrophies(client, data.earnedTrophies)
        await client.query('COMMIT')

        console.info("🟢 Insert into Postgres : Success")
        logInsertResult('psn.player', playerInsert);
        logInsertResult('psn.suite', suiteInsert);
        logInsertResult('psn.group', groupInsert);
        logInsertResult('psn.played_suite', playedSuiteInsert);
        logInsertResult('psn.trophy', trophyInsert);
        logInsertResult('psn.earned_trophy', earnedTrophyInsert);
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
