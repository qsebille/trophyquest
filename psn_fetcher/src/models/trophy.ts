export interface Trophy {
    id: string,
    trophySuiteId: string,
    rank: number,
    title: string,
    detail: string,
    isHidden: boolean,
    trophyType: string,
    iconUrl: string,
    groupId: string,
}

export function buildTrophyUniqueId(trophySuite: string, rank: number,) {
    return `${trophySuite}:${rank}`;
}