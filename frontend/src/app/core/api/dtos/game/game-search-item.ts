export interface GameSearchItem {
  id: string;
  name: string;
  imageUrl: string;
  summary: string;
  genres: string[];
  themes: string[];
  platforms: string[];
  website: string;
  releaseDate: Date;
  nbPlayers: number;
  nbTrophySuites: number;
}
