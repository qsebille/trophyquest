import {PoolClient} from "pg";
import {buildPostgresInsertPlaceholders} from "../utils/build-postgres-insert-placeholders.js";
import {computeEditionUuid, computeGameUuid} from "../../uuid/uuid.js";
import {Edition} from "../../models/edition.js";

export async function insertIntoPsnEditionTable(client: PoolClient, editions: Edition[]) {
    if (editions.length === 0) {
        console.warn("No data to insert into app.psn_edition table.");
        return {rowsInserted: 0, rowsIgnored: 0};
    }

    const batchSize: number = editions.length > 1000 ? 1000 : editions.length;
    let rowsInserted: number = 0;
    let rowsIgnored: number = 0;

    for (let i = 0; i < editions.length; i += batchSize) {
        const batch = editions.slice(i, i + batchSize);
        const values: string[] = [];
        const placeholders: string = editions.map((edition, idx) => {
            const currentValues = [
                computeEditionUuid(edition.id),
                computeGameUuid(edition.gameId),
                edition.name,
                edition.imageUrl,
                edition.category,
                edition.service,
            ]
            values.push(...currentValues);
            return buildPostgresInsertPlaceholders(currentValues, idx);
        }).join(',');
        const insert = await client.query(`
            insert into app.psn_edition (id, psn_game_id, name, psn_image_url, category, service)
            values
            ${placeholders} on conflict (id)
            do nothing
        `, values);

        rowsInserted += insert.rowCount ?? 0;
        rowsIgnored += (batch.length - (insert.rowCount ?? 0));
    }

    return {rowsInserted, rowsIgnored};
}