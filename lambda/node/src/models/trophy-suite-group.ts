export interface TrophySuiteGroup {
    trophySuiteId: string,
    psnId: string, // 'default' for base games, otherwise increments '001', '002', etc. for each DLC
    name: string,
}

export function buildTrophySuiteGroupUniqueId(trophySuiteId: string, psnId: string) {
    return `${trophySuiteId}:${psnId}`;
}

