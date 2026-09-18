export interface GameDetailsResponse {
  gameId: string
  title: string
  summary: string
  genres: string[]
  themes: string[]
  releaseDate: Date
  coverUrl: string
  screenshotUrls: string[]
}
