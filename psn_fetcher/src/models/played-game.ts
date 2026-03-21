import {Game} from "./game.js";

export interface PlayedGame {
    game: Game,
    playerId: string,
    firstPlayedAt: string,
    lastPlayedAt: string,
}