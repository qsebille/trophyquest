import {Routes} from '@angular/router';
import {PlayersPageComponent} from './players/components/players-page/players-page.component';
import {ProfilePageComponent} from './profile/components/profile-page/profile-page.component';
import {ErrorPageComponent} from './core/components/error-page/error-page.component';
import {HomePageComponent} from './home/components/home-page/home-page.component';
import {IgdbMappingPage} from "./igdb-mapping/components/igdb-mapping-page/igdb-mapping-page.component";
import {DashboardPageComponent} from "./dashboard/components/dashboard-page/dashboard-page.component";
import {GamePageComponent} from './game/components/game-page/game-page.component';
import {AuthCallbackComponent} from './core/components/auth-callback/auth-callback.component';

export const routes: Routes = [
  {path: 'home', component: HomePageComponent},
  {path: 'players', component: PlayersPageComponent},
  {path: 'profile/:playerId', component: ProfilePageComponent},
  {path: 'game/:gameId', component: GamePageComponent},
  {path: 'error', component: ErrorPageComponent},
  {path: 'igdb-mapping', component: IgdbMappingPage},
  {path: 'dashboard', component: DashboardPageComponent},
  {path: 'auth/callback', component: AuthCallbackComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', redirectTo: 'home'},
];
