import {GameImage} from "./game-image";

export interface TrophySuiteGameDetails {
    id: string;
    name: string;
    summary: string;
    genres: string[];
    releaseDate: string;
    images: GameImage[];
}

export const EMPTY_GAME: TrophySuiteGameDetails = {id: '', name: ''} as TrophySuiteGameDetails;