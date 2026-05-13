export interface ActivePlayerTrophy {
  playerId: string,
  trophyId: string,
  trophySuiteId: string,
  gameId: string,
  gameName: string,
  playerPseudo: string,
  playerAvatarUrl: string,
  trophyTitle: string,
  trophyType: string,
  trophyIconUrl: string,
  trophyEarnedAt: Date,
  nbRecentlyEarnedTrophies: number,
}
