interface HomeStatsObjectCount {
  game: number;
  player: number;
  trophy: number;
}

export interface HomeStatsData {
  total: HomeStatsObjectCount;
  lastWeek: HomeStatsObjectCount;
}
