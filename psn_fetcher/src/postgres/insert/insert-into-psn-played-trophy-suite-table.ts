import {PoolClient} from "pg";
import {buildPostgresInsertPlaceholders} from "../utils/build-postgres-insert-placeholders.js";
import {computePlayerUuid, computeTrophySuiteUuid} from "../../uuid/uuid.js";
import {PlayedTrophySuite} from "../../models/played-trophy-suite.js";

export async function insertIntoPsnPlayedTrophySuiteTable(
    client: PoolClient,
    playedTrophySuites: PlayedTrophySuite[]
) {
    if (playedTrophySuites.length === 0) {
        console.warn("No data to insert into app.psn_played_trophy_suite table.");
        return {rowsInserted: 0, rowsIgnored: 0};
    }

    const batchSize: number = playedTrophySuites.length > 1000 ? 1000 : playedTrophySuites.length;
    let rowsInserted: number = 0;

    for (let i = 0; i < playedTrophySuites.length; i += batchSize) {
        const batch = playedTrophySuites.slice(i, i + batchSize);
        const values: string[] = [];
        const placeholders: string = batch.map((pts, idx) => {
            const currentValues = [
                computePlayerUuid(pts.playerId),
                computeTrophySuiteUuid(pts.trophySuite.id),
                pts.lastPlayedAt,
            ]
            values.push(...currentValues);
            return buildPostgresInsertPlaceholders(currentValues, idx);
        }).join(',');
        const insert = await client.query(`
            insert into app.psn_played_trophy_suite (player_id, trophy_suite_id, last_played_at)
            values
            ${placeholders} on conflict (player_id, trophy_suite_id)
            do
            update set last_played_at=EXCLUDED.last_played_at
        `, values);

        rowsInserted += insert.rowCount ?? 0;
    }

    return {rowsInserted, rowsIgnored: 0};
}