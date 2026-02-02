export interface TrophySuite {
    id: string,
    title: string,
    platforms: string[],
    image: string
}

export const EMPTY_TROPHY_SUITE: TrophySuite = {id: '', title: '', platforms: [], image: ''};