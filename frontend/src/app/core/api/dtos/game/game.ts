export interface Game {
    id: string;
    name: string;
}

export const EMPTY_GAME: Game = {id: '', name: ''} as Game;