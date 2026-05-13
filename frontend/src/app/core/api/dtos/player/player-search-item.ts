export interface PlayerSearchItem {
  id: string
  pseudo: string
  avatar: string
  nbPlayedGames: number
  nbEarnedPlatinum: number
  nbEarnedGold: number
  nbEarnedSilver: number
  nbEarnedBronze: number
}

export const emptyPlayerSearchItem: PlayerSearchItem = {
  id: '',
  pseudo: '',
  avatar: 'empty.png',
  nbPlayedGames: 0,
  nbEarnedPlatinum: 0,
  nbEarnedGold: 0,
  nbEarnedSilver: 0,
  nbEarnedBronze: 0
};
