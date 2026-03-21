import {PoolClient} from "pg";
import {buildPostgresInsertPlaceholders} from "../utils/build-postgres-insert-placeholders.js";
import {computeGameUuid, computePlayerUuid} from "../../uuid/uuid.js";
import {PlayedGame} from "../../models/played-game.js";

export async function insertIntoPsnPlayedGameTable(client: PoolClient, playedGames: PlayedGame[]) {
    if (playedGames.length === 0) {
        console.warn("No data to insert into app.psn_played_game table.");
        return {rowsInserted: 0, rowsIgnored: 0};
    }

    const batchSize: number = playedGames.length > 1000 ? 1000 : playedGames.length;
    let rowsInserted: number = 0;

    for (let i = 0; i < playedGames.length; i += batchSize) {
        const batch = playedGames.slice(i, i + batchSize);
        const values: string[] = [];
        const placeholders: string = batch.map((playedGame, idx) => {
            const currentValues = [
                computePlayerUuid(playedGame.playerId),
                computeGameUuid(playedGame.game.id),
                playedGame.firstPlayedAt,
                playedGame.lastPlayedAt,
            ];
            values.push(...currentValues);
            return buildPostgresInsertPlaceholders(currentValues, idx);
        }).join(',');

        const insert = await client.query(`
            insert into app.psn_played_game (player_id, game_id, first_played_at, last_played_at)
            values
            ${placeholders} on conflict (player_id,game_id)
            do
            update set last_played_at=EXCLUDED.last_played_at
        `, values);

        rowsInserted += insert.rowCount ?? 0;
    }

    return {rowsInserted, rowsIgnored: 0};
}