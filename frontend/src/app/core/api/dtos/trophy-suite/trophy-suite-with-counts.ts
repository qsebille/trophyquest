export interface TrophySuiteWithCounts {
  id: string,
  title: string,
  platforms: string[],
  image: string,
  totalPlatinumTrophies: number,
  totalGoldTrophies: number,
  totalSilverTrophies: number,
  totalBronzeTrophies: number,
}

export const emptyTrophySuiteWithCounts: TrophySuiteWithCounts = {
  id: '',
  title: '',
  platforms: [],
  image: '',
  totalPlatinumTrophies: 0,
  totalGoldTrophies: 0,
  totalSilverTrophies: 0,
  totalBronzeTrophies: 0
};
