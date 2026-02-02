export interface PlayedTrophySuiteSearchElement {
    id: string
    name: string
    platforms: string[]
    imageUrl: string
    lastPlayedAt: Date
    totalTrophies: number
    totalEarnedPlatinum: number
    totalEarnedGold: number
    totalEarnedSilver: number
    totalEarnedBronze: number
}