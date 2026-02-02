import {Pool} from "pg";
import {RefreshProfileData} from "../../models/refresh-profile-data.js";


export async function selectProfiles(pool: Pool): Promise<RefreshProfileData[]> {
    const userQueryResult = await pool.query(`
        select p.pseudo,
               MAX(pts.last_played_at) as last_played_trophy_suite,
               MAX(pg.last_played_at)  as last_played_game
        from app.psn_player p
                 join app.psn_played_trophy_suite pts on pts.player_id = p.id
                 join app.psn_played_game pg on pg.player_id = p.id
        group by p.pseudo
    `);

    return userQueryResult.rows.map(row => ({
        pseudo: row.pseudo,
        lastPlayedGame: new Date(row.last_played_game),
        lastPlayedTrophySuite: new Date(row.last_played_trophy_suite),
    }));
}