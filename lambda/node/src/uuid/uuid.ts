import {v5 as uuidv5} from "uuid";

const NS_ROOT = 'f80e96f2-342c-45d5-9108-b24d9a5aa41c'

const NAMESPACES = {
    player: uuidv5("trophyquest:player", NS_ROOT),
    game: uuidv5("trophyquest:game", NS_ROOT),
    edition: uuidv5("trophyquest:edition", NS_ROOT),
    trophySuite: uuidv5("trophyquest:trophy-suite", NS_ROOT),
    trophySuiteGroup: uuidv5("trophyquest:trophy-suite-group", NS_ROOT),
    trophy: uuidv5("trophyquest:trophy", NS_ROOT),
};

export function computePlayerUuid(accountId: string) {
    return uuidv5(accountId, NAMESPACES.player);
}

export function computeGameUuid(gameId: number) {
    return uuidv5(gameId.toString(), NAMESPACES.game);
}

export function computeEditionUuid(npTitleId: string) {
    return uuidv5(npTitleId, NAMESPACES.edition);
}

export function computeTrophySuiteUuid(trophySuiteId: string) {
    return uuidv5(trophySuiteId, NAMESPACES.trophySuite);
}

export function computeTrophySuiteGroupUuid(groupId: string) {
    return uuidv5(groupId, NAMESPACES.trophySuiteGroup);
}

export function computeTrophyUuid(trophyId: string) {
    return uuidv5(trophyId, NAMESPACES.trophy);
}