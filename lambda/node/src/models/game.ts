import {GameImage} from "./game-image.js";

export interface Game {
    id: number,
    name: string,
    images: GameImage[],
    psnTitleIds: string[],
}