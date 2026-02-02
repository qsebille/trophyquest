import {EarnedTrophy} from "../../api/dtos/trophy/earned-trophy";

export interface GameGroup {
    groupId: string;
    groupName: string;
    trophies: EarnedTrophy[];
}
