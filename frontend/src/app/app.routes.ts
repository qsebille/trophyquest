import {Routes} from '@angular/router';
import {PlayersPageComponent} from './players/page/players-page.component';
import {ProfilePageComponent} from './pages/profile/profile-page.component';
import {ErrorPageComponent} from './core/components/error-page/error-page.component';
import {HomePageComponent} from './pages/home/home-page.component';
import {IgdbMappingPage} from "./igdb-mapping/page/igdb-mapping-page.component";
import {GameDetailsPageComponent} from './pages/game-details/game-details-page.component';
import {AuthCallbackComponent} from './core/components/auth-callback/auth-callback.component';
import {GameSearchPageComponent} from './game-search/page/game-search-page.component';
import {AssociationComponent} from './pages/association/association.component';

export const routes: Routes = [
  {path: 'home', component: HomePageComponent},
  {path: 'players', component: PlayersPageComponent},
  {path: 'game-search', component: GameSearchPageComponent},
  {path: 'profile/:playerId', component: ProfilePageComponent},
  {path: 'game-details/:gameId', component: GameDetailsPageComponent},
  {path: 'error', component: ErrorPageComponent},
  {path: 'igdb-mapping', component: IgdbMappingPage}, // TODO: delete
  {path: 'association', component: AssociationComponent},
  {path: 'auth/callback', component: AuthCallbackComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', redirectTo: 'home'},
];
