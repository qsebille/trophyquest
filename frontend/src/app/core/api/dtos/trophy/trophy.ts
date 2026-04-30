export interface Trophy {
  id: string;
  rank: number;
  title: string;
  description: string;
  trophyType: 'bronze' | 'silver' | 'gold' | 'platinum';
  isHidden: boolean;
  iconUrl: string;
  groupType: string;
  groupName: string;
  trophySuiteId: string;
  earnedAt: Date;
}
