import {PoolClient} from "pg";
import {buildPostgresInsertPlaceholders} from "../utils/build-postgres-insert-placeholders.js";
import {computePlayerUuid, computeTrophyUuid} from "../../uuid/uuid.js";
import {EarnedTrophy} from "../../models/earned-trophy.js";

export async function insertIntoPsnEarnedTrophyTable(client: PoolClient, earnedTrophies: EarnedTrophy[]) {
    if (earnedTrophies.length === 0) {
        console.warn("No data to insert into app.psn_earned_trophy table.");
        return {rowsInserted: 0, rowsIgnored: 0};
    }

    const batchSize: number = earnedTrophies.length > 1000 ? 1000 : earnedTrophies.length;
    let rowsInserted: number = 0;
    let rowsIgnored: number = 0;

    for (let i = 0; i < earnedTrophies.length; i += batchSize) {
        const batch = earnedTrophies.slice(i, i + batchSize);
        const values: string[] = [];
        const placeholders: string = batch.map((earnedTrophy, idx) => {
            const currentValues = [
                computePlayerUuid(earnedTrophy.playerId),
                computeTrophyUuid(earnedTrophy.trophyId),
                earnedTrophy.earnedAt,
            ]
            values.push(...currentValues);
            return buildPostgresInsertPlaceholders(currentValues, idx);
        }).join(',');
        const insert = await client.query(`
            insert into app.psn_earned_trophy (player_id, trophy_id, earned_at)
            values
            ${placeholders} on conflict (player_id, trophy_id)
            do nothing
        `, values);

        rowsInserted += insert.rowCount ?? 0;
        rowsIgnored += (batch.length - (insert.rowCount ?? 0));
    }

    return {rowsInserted, rowsIgnored};
}