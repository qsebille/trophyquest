import {PoolClient} from "pg";
import {buildPostgresInsertPlaceholders} from "../utils/build-postgres-insert-placeholders.js";
import {computeEditionUuid, computeTrophySuiteUuid} from "../../uuid/uuid.js";
import {EditionTrophySuiteLink} from "../../models/edition-trophy-suite-link.js";

export async function insertIntoPsnEditionTrophySuiteTable(client: PoolClient, links: EditionTrophySuiteLink[]) {
    if (links.length === 0) {
        console.warn("No data to insert into app.psn_edition_trophy_suite table.");
        return {rowsInserted: 0, rowsIgnored: 0};
    }

    const batchSize: number = links.length > 1000 ? 1000 : links.length;
    let rowsInserted: number = 0;
    let rowsIgnored: number = 0;

    for (let i = 0; i < links.length; i += batchSize) {
        const batch = links.slice(i, i + batchSize);
        const values: string[] = [];
        const placeholders: string = links.map((link, idx) => {
            const currentValues = [
                computeEditionUuid(link.editionId),
                computeTrophySuiteUuid(link.trophySuiteId),
            ]
            values.push(...currentValues);
            return buildPostgresInsertPlaceholders(currentValues, idx);
        }).join(',');
        const insert = await client.query(`
            insert into app.psn_edition_trophy_suite (edition_id, trophy_suite_id)
            values
            ${placeholders} on conflict (edition_id, trophy_suite_id)
            do nothing
        `, values);

        rowsInserted += insert.rowCount ?? 0;
        rowsIgnored += (batch.length - (insert.rowCount ?? 0));
    }

    return {rowsInserted, rowsIgnored};
}