export interface GameDetails {
  id: string,
  name: string,
  description: string,
  genres: string[],
  themes: string[],
  releaseDate: string,
  coverUrl: string,
  screenshotsUrl: string[],
}

export const emptyGameDetails: GameDetails = {id: '', name: '', description: ''} as GameDetails;
