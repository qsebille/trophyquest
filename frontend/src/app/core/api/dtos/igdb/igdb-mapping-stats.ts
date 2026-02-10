export interface IgdbMappingStats {
    pending: number,
    validationRequired: number,
    noFoundCandidate: number,
    allRefused: number,
    matched: number,
}

export const EMPTY_IGDB_MAPPING_STATS: IgdbMappingStats = {
    pending: 0,
    validationRequired: 0,
    noFoundCandidate: 0,
    allRefused: 0,
    matched: 0
};