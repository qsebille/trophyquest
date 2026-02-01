import {PoolClient} from "pg";
import {buildPostgresInsertPlaceholders} from "../utils/build-postgres-insert-placeholders.js";
import {computePlayerUuid} from "../../uuid/uuid.js";
import {Player} from "../../models/player.js";

export async function insertIntoPsnPlayerTable(client: PoolClient, players: Player[]) {
    if (players.length === 0) {
        console.warn("No data to insert into app.psn_player table.");
        return {rowsInserted: 0, rowsIgnored: 0};
    }

    const values: string[] = [];
    const placeholders: string = players.map((player, idx) => {
        const currentValues = [computePlayerUuid(player.id), player.pseudo, player.avatarUrl];
        values.push(...currentValues);
        return buildPostgresInsertPlaceholders(currentValues, idx);
    }).join(',');

    const insert = await client.query(`
        INSERT INTO app.psn_player (id, pseudo, psn_avatar_url)
        VALUES
        ${placeholders} ON CONFLICT (id)
        DO UPDATE SET psn_avatar_url=EXCLUDED.psn_avatar_url
    `, values);

    const rowsInserted = insert.rowCount ?? 0;
    const rowsIgnored = (players.length - (insert.rowCount ?? 0));

    return {rowsInserted, rowsIgnored};
}