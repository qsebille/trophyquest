import {IgdbCandidate} from "./igdb-candidate";

export interface IgdbMapping {
    psnGameId: string,
    psnGameName: string,
    psnGameImageUrl: string,
    candidates: IgdbCandidate[],
}