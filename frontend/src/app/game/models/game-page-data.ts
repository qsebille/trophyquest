import {GameDetails} from '../../core/api/dtos/game/game-details';
import {TrophySuiteWithCounts} from '../../core/api/dtos/trophy-suite/trophy-suite-with-counts';

export interface GamePageData {
  details: GameDetails
  trophySuites: TrophySuiteWithCounts[]
}

export const emptyGamePageData: GamePageData = {
  details: {} as GameDetails,
  trophySuites: []
};
