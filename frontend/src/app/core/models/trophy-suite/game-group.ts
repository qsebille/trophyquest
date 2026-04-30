import {Trophy} from "../../api/dtos/trophy/trophy";

export interface GameGroup {
  groupId: string;
  groupName: string;
  trophies: Trophy[];
}
