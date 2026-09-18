import {AssociationGameItem} from './association-game-item';
import {AssociationSuiteItem} from './association-suite-item';

export interface AssociationItem {
  suite: AssociationSuiteItem
  games: AssociationGameItem[]
}
