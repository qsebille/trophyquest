export interface PlayerTrophySuite {
  id: string,
  gameId: string,
  trophySuiteId: string,
  name: string,
  platforms: string[],
  imageUrl: string,
  lastPlayedAt: Date,
  nbTrophies: number,
  nbEarnedPlatinum: number,
  nbEarnedGold: number,
  nbEarnedSilver: number,
  nbEarnedBronze: number,
}
