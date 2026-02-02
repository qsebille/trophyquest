export interface Player {
    id: string;
    pseudo: string;
    avatar: string;
}

export const EMPTY_PLAYER: Player = {id: '', pseudo: '', avatar: 'empty.png'};
