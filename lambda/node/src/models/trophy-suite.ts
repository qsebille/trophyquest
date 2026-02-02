export interface TrophySuite {
    id: string,
    name: string,
    version: string,
    iconUrl: string,
    platforms: string,
    hasTrophyGroups: boolean,
    npServiceName: 'trophy' | 'trophy2' | undefined,
}