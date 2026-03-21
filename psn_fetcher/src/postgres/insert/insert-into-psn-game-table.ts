import {PoolClient} from "pg";
import {buildPostgresInsertPlaceholders} from "../utils/build-postgres-insert-placeholders.js";
import {Game} from "../../models/game.js";
import {computeGameUuid} from "../../uuid/uuid.js";

export async function insertIntoPsnGameTable(
    client: PoolClient,
    games: Game[],
) {
    if (games.length === 0) {
        console.warn("No data to insert into app.psn_game table.");
        return {rowsInserted: 0, rowsIgnored: 0};
    }

    const batchSize: number = games.length > 1000 ? 1000 : games.length;
    let rowsInserted: number = 0;
    let rowsIgnored: number = 0;

    for (let i = 0; i < games.length; i += batchSize) {
        const batch = games.slice(i, i + batchSize);
        const values: string[] = [];
        const placeholders: string = games.map((game, idx) => {
            const currentValues = [computeGameUuid(game.id), game.name];
            values.push(...currentValues);
            return buildPostgresInsertPlaceholders(currentValues, idx);
        }).join(',');

        const insert = await client.query(`
            insert into app.psn_game (id, name)
            values
            ${placeholders} on conflict (id)
            do nothing
        `, values);

        rowsInserted += insert.rowCount ?? 0;
        rowsIgnored += (batch.length - (insert.rowCount ?? 0));
    }

    return {rowsInserted, rowsIgnored};
}