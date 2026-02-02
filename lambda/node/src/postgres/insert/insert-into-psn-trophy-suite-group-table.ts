import {PoolClient} from "pg";
import {buildPostgresInsertPlaceholders} from "../utils/build-postgres-insert-placeholders.js";
import {computeTrophySuiteGroupUuid, computeTrophySuiteUuid} from "../../uuid/uuid.js";
import {buildTrophySuiteGroupUniqueId, TrophySuiteGroup} from "../../models/trophy-suite-group.js";

export async function insertIntoPsnTrophySuiteGroupTable(client: PoolClient, groups: TrophySuiteGroup[]) {
    if (groups.length === 0) {
        console.warn("No data to insert into app.psn_trophy_suite_group table.");
        return {rowsInserted: 0, rowsIgnored: 0};
    }

    const batchSize: number = groups.length > 1000 ? 1000 : groups.length;
    let rowsInserted: number = 0;
    let rowsIgnored: number = 0;

    for (let i = 0; i < groups.length; i += batchSize) {
        const batch = groups.slice(i, i + batchSize);
        const values: string[] = [];
        const placeholders: string = groups.map((group, idx) => {
            const id = buildTrophySuiteGroupUniqueId(group.trophySuiteId, group.psnId);
            const currentValues = [
                computeTrophySuiteGroupUuid(id),
                computeTrophySuiteUuid(group.trophySuiteId),
                group.psnId,
                group.name,
            ]
            values.push(...currentValues);
            return buildPostgresInsertPlaceholders(currentValues, idx);
        }).join(',');
        const insert = await client.query(`
            insert into app.psn_trophy_suite_group (id, trophy_suite_id, psn_id, name)
            values
            ${placeholders} on conflict (id)
            do nothing
        `, values);

        rowsInserted += insert.rowCount ?? 0;
        rowsIgnored += (batch.length - (insert.rowCount ?? 0));
    }

    return {rowsInserted, rowsIgnored};
}