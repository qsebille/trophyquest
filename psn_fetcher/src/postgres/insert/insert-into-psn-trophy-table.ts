import {PoolClient} from "pg";
import {buildPostgresInsertPlaceholders} from "../utils/build-postgres-insert-placeholders.js";
import {computeTrophySuiteGroupUuid, computeTrophySuiteUuid, computeTrophyUuid} from "../../uuid/uuid.js";
import {Trophy} from "../../models/trophy.js";

export async function insertIntoPsnTrophyTable(
    client: PoolClient,
    trophies: Trophy[]
) {
    if (trophies.length === 0) {
        console.warn("No data to insert into app.psn_trophy table.");
        return {rowsInserted: 0, rowsIgnored: 0};
    }

    const batchSize: number = trophies.length > 1000 ? 1000 : trophies.length;
    let rowsInserted: number = 0;
    let rowsIgnored: number = 0;

    for (let i = 0; i < trophies.length; i += batchSize) {
        const batch = trophies.slice(i, i + batchSize);
        const values: string[] = [];
        const placeholders: string = batch.map((trophy, idx) => {
            const currentValues = [
                computeTrophyUuid(trophy.id),
                computeTrophySuiteUuid(trophy.trophySuiteId),
                computeTrophySuiteGroupUuid(trophy.groupId),
                trophy.rank.toString(),
                trophy.title,
                trophy.detail,
                trophy.trophyType,
                trophy.isHidden.toString(),
                trophy.iconUrl,
            ]
            values.push(...currentValues);
            return buildPostgresInsertPlaceholders(currentValues, idx);
        }).join(',');
        const insert = await client.query(`
            insert into app.psn_trophy (id, trophy_suite_id, trophy_suite_group_id, rank, title, description,
                                        trophy_type, is_hidden, psn_icon_url)
            values
            ${placeholders} on conflict (id)
            do nothing
        `, values);

        rowsInserted += insert.rowCount ?? 0;
        rowsIgnored += (batch.length - (insert.rowCount ?? 0));
    }

    return {rowsInserted, rowsIgnored};
}