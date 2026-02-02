import {Routes} from '@angular/router';
import {PlayersPageComponent} from './players/components/players-page/players-page.component';
import {ProfilePageComponent} from './profile/components/profile-page/profile-page.component';
import {ErrorPageComponent} from './core/components/error-page/error-page.component';
import {HomePageComponent} from './home/components/home-page/home-page.component';
import {IgdbMappingPage} from "./igdb-mapping/components/igdb-mapping-page/igdb-mapping-page.component";
import {TrophySuitePageComponent} from "./trophy-suite/components/trophy-suite-page/trophy-suite-page.component";

export const routes: Routes = [
    {path: 'home', component: HomePageComponent},
    {path: 'players', component: PlayersPageComponent},
    {path: 'profile/:playerId', component: ProfilePageComponent},
    {path: 'trophy-suite/:trophySuiteId', component: TrophySuitePageComponent},
    {path: 'error', component: ErrorPageComponent},
    {path: 'candidate-validation', component: IgdbMappingPage},
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: '**', redirectTo: 'home'},
];
