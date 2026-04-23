export interface PlayerStats {
  totalTrophySuitesPlayed: number;
  totalPlatinumTrophies: number;
  totalGoldTrophies: number;
  totalSilverTrophies: number;
  totalBronzeTrophies: number;
}

export const emptyPlayerStats: PlayerStats = {
  totalTrophySuitesPlayed: 0,
  totalPlatinumTrophies: 0,
  totalGoldTrophies: 0,
  totalSilverTrophies: 0,
  totalBronzeTrophies: 0,
};
