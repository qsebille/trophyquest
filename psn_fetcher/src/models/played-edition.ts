import {Edition} from "./edition.js";

export interface PlayedEdition {
    edition: Edition,
    playerId: string,
    lastPlayedAt: string,
}