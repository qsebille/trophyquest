export interface EarnedTrophy {
    id: string;
    rank: number;
    title: string;
    description: string;
    trophyType: 'bronze' | 'silver' | 'gold' | 'platinum';
    isHidden: boolean;
    icon: string;
    trophyGroupId: string;
    trophyGroupName: string;
    trophySuiteId: string;
    trophySuiteTitle: string;
    earnedAt: Date;
}