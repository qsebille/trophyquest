import {HomeActivePlayerTrophy} from './home-active-player-trophy';

export interface HomeActivePlayer {
  id: string,
  pseudo: string,
  avatarUrl: string,
  nbRecentlyEarnedTrophies: number,
  trophies: HomeActivePlayerTrophy[],
}
