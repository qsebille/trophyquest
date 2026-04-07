import {GameImage} from "./game-image";

export interface GameDetails {
  id: string;
  name: string;
  description: string;
  genres: string[];
  themes: string[];
  releaseDate: string;
  images: GameImage[];
}

export const emptyGameDetails: GameDetails = {id: '', name: '', description: ''} as GameDetails;
