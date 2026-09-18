export interface GameTrophyItem {
  trophyId: string
  rank: number
  title: string
  description: string
  color: string
  isHidden: boolean
  iconUrl: string
  groupName: string
  earnedAt: Date
}
