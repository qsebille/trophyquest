import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BackgroundImageService} from '../../core/stores/background-image.service';
import {NgbNav, NgbNavContent, NgbNavItem, NgbNavLinkButton, NgbNavOutlet} from '@ng-bootstrap/ng-bootstrap';
import {GameDetailsComponent} from '../components/game-details/game-details.component';
import {Location} from '@angular/common';
import {GamePlayersComponent} from '../components/game-players/game-players.component';
import {NavigatorService} from '../../core/services/navigator.service';
import {
  GameTrophySuiteListComponent
} from '../components/trophy-suite/game-trophy-suite-list/game-trophy-suite-list.component';
import {GameDataService} from '../services/game-data.service';

@Component({
  selector: 'tq-game-page',
  imports: [
    NgbNav,
    NgbNavItem,
    NgbNavLinkButton,
    NgbNavContent,
    NgbNavOutlet,
    GameDetailsComponent,
    GamePlayersComponent,
    GameTrophySuiteListComponent
  ],
  providers: [GameDataService],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.scss',
})
export class GamePageComponent {
  private readonly gameId: string;
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly location = inject(Location);
  private readonly backgroundImageService = inject(BackgroundImageService);
  private readonly dataService = inject(GameDataService);
  private readonly navigator = inject(NavigatorService);

  selectedTab = 'overview';
  selectedTrophySuiteId: string | null = null;
  selectedPlayerId: string | null = null;

  readonly isError = this.dataService.isError;
  readonly gameDetails = this.dataService.gameDetails;
  readonly trophySuites = this.dataService.trophySuites;
  readonly trophies = this.dataService.trophies;
  readonly playersPagination = this.dataService.playersPagination;

  constructor() {
    this.gameId = this.route.snapshot.paramMap.get('gameId')!;
  }

  ngOnInit(): void {
    const queryParams = this.route.snapshot.queryParamMap;
    this.selectedTab = queryParams.get('tab') ?? 'overview';
    this.selectedTrophySuiteId = queryParams.get('trophySuiteId');
    this.selectedPlayerId = queryParams.get('playerId');

    this.backgroundImageService.useGameBackground(this.gameId);
    this.dataService.fetchDetails(this.gameId);
    this.dataService.fetchPlayers(this.gameId, 0);
    if (!!this.selectedTrophySuiteId) {
      this.refreshTrophies(this.selectedTrophySuiteId);
    }
  }

  ngOnDestroy() {
    this.dataService.reset();
  }

  onTabChange(tab: string) {
    this.selectedTab = tab;
    this.updateUrl();
  }

  onTrophySuiteSelectedChange(tsId: string | null) {
    this.selectedTrophySuiteId = tsId;
    this.updateUrl();
    this.refreshTrophies(tsId);
  }

  private updateUrl(): void {
    const urlTree = this.router.createUrlTree([], {
      relativeTo: this.route,
      queryParams: {
        tab: this.selectedTab,
        trophySuiteId: this.selectedTrophySuiteId ?? null,
        playerId: this.selectedPlayerId ?? null,
      },
      queryParamsHandling: 'merge',
    });

    this.location.replaceState(this.router.serializeUrl(urlTree));
  }

  onPlayerPageChange(page: number) {
    this.dataService.fetchPlayers(this.gameId, page);
  }

  onPlayerSelected(playerId: string) {
    this.selectedPlayerId = playerId;
    this.selectedTab = 'trophies';
    this.updateUrl();
    this.refreshTrophies(this.selectedTrophySuiteId);
  }

  goToProfilePage(playerId: string): void {
    this.navigator.goToProfilePage(playerId);
  }

  private refreshTrophies(trophySuiteId: string | null): void {
    this.dataService.fetchTrophies(trophySuiteId, this.selectedPlayerId);
  }
}

