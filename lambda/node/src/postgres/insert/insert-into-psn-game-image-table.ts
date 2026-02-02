import {PoolClient} from "pg";
import {buildPostgresInsertPlaceholders} from "../utils/build-postgres-insert-placeholders.js";
import {Game} from "../../models/game.js";
import {computeGameUuid} from "../../uuid/uuid.js";

export async function insertIntoPsnGameImageTable(client: PoolClient, games: Game[]) {
    const images = games.flatMap(game =>
        game.images.map(image => ({...image, gameId: game.id}))
    );
    if (images.length === 0) {
        console.warn("No data to insert into app.psn_game_image table.");
        return {rowsInserted: 0, rowsIgnored: 0};
    }

    const batchSize: number = images.length > 1000 ? 1000 : images.length;
    let rowsInserted: number = 0;
    let rowsIgnored: number = 0;

    for (let i = 0; i < images.length; i += batchSize) {
        const batch = images.slice(i, i + batchSize);
        const values: string[] = [];
        const placeholders: string = images.map((gameImage, idx) => {
            const currentValues = [computeGameUuid(gameImage.gameId), gameImage.url, gameImage.type, gameImage.format];
            values.push(...currentValues);
            return buildPostgresInsertPlaceholders(currentValues, idx);
        }).join(',');
        const insert = await client.query(`
            insert into app.psn_game_image (psn_game_id, psn_url, type, format)
            values
            ${placeholders} on conflict (psn_game_id,psn_url)
            do nothing
        `, values);

        rowsInserted += insert.rowCount ?? 0;
        rowsIgnored += (batch.length - (insert.rowCount ?? 0));
    }

    return {rowsInserted, rowsIgnored};
}