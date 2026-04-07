import {GameDetails} from '../../core/api/dtos/game/game-details';

export interface GamePageData {
  details: GameDetails;
}

export const emptyGamePageData: GamePageData = {
  details: {} as GameDetails
};
