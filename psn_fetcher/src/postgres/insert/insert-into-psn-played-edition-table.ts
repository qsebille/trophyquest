import {PoolClient} from "pg";
import {buildPostgresInsertPlaceholders} from "../utils/build-postgres-insert-placeholders.js";
import {computeEditionUuid, computePlayerUuid} from "../../uuid/uuid.js";
import {PlayedEdition} from "../../models/played-edition.js";

export async function insertIntoPsnPlayedEditionTable(client: PoolClient, playedEditions: PlayedEdition[]) {
    if (playedEditions.length === 0) {
        console.warn("No data to insert into app.psn_played_edition table.");
        return {rowsInserted: 0, rowsIgnored: 0};
    }

    const batchSize: number = playedEditions.length > 1000 ? 1000 : playedEditions.length;
    let rowsInserted: number = 0;

    // Deduplicate played editions by player and edition ID combination
    const distinctPlayedEditionById = new Map<string, PlayedEdition>();
    for (const playedEdition of playedEditions) {
        const id = `${playedEdition.playerId}-${playedEdition.edition.id}`;
        if (distinctPlayedEditionById.has(id)) {
            continue;
        }
        distinctPlayedEditionById.set(id, playedEdition);
    }
    const distinctPlayedEditions = [...distinctPlayedEditionById.values()];

    for (let i = 0; i < distinctPlayedEditions.length; i += batchSize) {
        const batch = distinctPlayedEditions.slice(i, i + batchSize);
        const values: string[] = [];
        const placeholders: string = batch.map((playedEdition, idx) => {
            const currentValues = [
                computePlayerUuid(playedEdition.playerId),
                computeEditionUuid(playedEdition.edition.id),
                playedEdition.lastPlayedAt,
            ]
            values.push(...currentValues);
            return buildPostgresInsertPlaceholders(currentValues, idx);
        }).join(',');
        const insert = await client.query(`
            insert into app.psn_played_edition (player_id, edition_id, last_played_at)
            values
            ${placeholders} on conflict (player_id, edition_id)
            do
            update set last_played_at=EXCLUDED.last_played_at
        `, values);

        rowsInserted += insert.rowCount ?? 0;
    }

    return {rowsInserted, rowsIgnored: 0};
}