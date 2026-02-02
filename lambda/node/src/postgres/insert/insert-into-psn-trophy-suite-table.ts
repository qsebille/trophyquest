import {PoolClient} from "pg";
import {buildPostgresInsertPlaceholders} from "../utils/build-postgres-insert-placeholders.js";
import {computeTrophySuiteUuid} from "../../uuid/uuid.js";
import {TrophySuite} from "../../models/trophy-suite.js";

export async function insertIntoPsnTrophySuiteTable(client: PoolClient, trophySuites: TrophySuite[]) {
    if (trophySuites.length === 0) {
        console.warn("No data to insert into app.psn_trophy_suite table.");
        return {rowsInserted: 0, rowsIgnored: 0};
    }

    const batchSize: number = trophySuites.length > 1000 ? 1000 : trophySuites.length;
    let rowsInserted: number = 0;
    let rowsIgnored: number = 0;

    for (let i = 0; i < trophySuites.length; i += batchSize) {
        const batch = trophySuites.slice(i, i + batchSize);
        const values: string[] = [];
        const placeholders: string = trophySuites.map((ts, idx) => {
            const currentValues = [
                computeTrophySuiteUuid(ts.id),
                ts.name,
                ts.version,
                ts.iconUrl,
                `{${ts.platforms}}`,
            ]
            values.push(...currentValues);
            return buildPostgresInsertPlaceholders(currentValues, idx);
        }).join(',');
        const insert = await client.query(`
            insert into app.psn_trophy_suite (id, name, version, psn_image_url, platforms)
            values
            ${placeholders} on conflict (id)
            do nothing
        `, values);

        rowsInserted += insert.rowCount ?? 0;
        rowsIgnored += (batch.length - (insert.rowCount ?? 0));
    }

    return {rowsInserted, rowsIgnored};
}