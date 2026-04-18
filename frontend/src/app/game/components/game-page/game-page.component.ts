import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GameCoverStoreService} from '../../../core/stores/game-cover-store.service';
import {NgbNav, NgbNavContent, NgbNavItem, NgbNavLinkButton, NgbNavOutlet} from '@ng-bootstrap/ng-bootstrap';
import {GamePageStoreService} from '../../stores/game-page-store.service';
import {GameDetailsComponent} from '../game-details/game-details.component';
import {Location} from '@angular/common';
import {GamePlayersComponent} from '../game-players/game-players.component';
import {NavigatorService} from '../../../core/services/navigator.service';
import {GameTrophySuiteListComponent} from '../trophy-suite/game-trophy-suite-list/game-trophy-suite-list.component';

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
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.scss',
})
export class GamePageComponent {
  private readonly gameId: string;
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly router: Router = inject(Router);
  private readonly location: Location = inject(Location);
  private readonly gameCoverStoreService: GameCoverStoreService = inject(GameCoverStoreService);
  private readonly store: GamePageStoreService = inject(GamePageStoreService);
  readonly navigator: NavigatorService = inject(NavigatorService);

  selectedTab = 'overview';
  selectedTrophySuiteId: string | null = null;
  selectedPlayerId: string | null = null;

  readonly gameDetails = this.store.gameDetails;
  readonly trophySuites = this.store.trophySuites;
  readonly trophies = this.store.trophies;
  readonly playersPagination = this.store.playersPagination;

  constructor() {
    this.gameId = this.route.snapshot.paramMap.get('gameId')!;
  }

  ngOnInit(): void {
    const queryParams = this.route.snapshot.queryParamMap;
    this.selectedTab = queryParams.get('tab') ?? 'overview';
    this.selectedTrophySuiteId = queryParams.get('trophySuiteId');
    this.selectedPlayerId = queryParams.get('playerId');

    this.gameCoverStoreService.useGameCover(this.gameId);
    this.store.fetchDetails(this.gameId);
    this.store.fetchPlayers(this.gameId, 0);
    if (!!this.selectedTrophySuiteId) {
      this.refreshTrophies(this.selectedTrophySuiteId);
    }
  }

  ngOnDestroy() {
    this.store.reset();
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
    this.store.fetchPlayers(this.gameId, page);
  }

  onPlayerSelected(playerId: string) {
    this.selectedPlayerId = playerId;
    this.selectedTab = 'trophies';
    this.updateUrl();
    this.refreshTrophies(this.selectedTrophySuiteId);
  }

  private refreshTrophies(trophySuiteId: string | null): void {
    this.store.fetchTrophies(trophySuiteId, this.selectedPlayerId);
  }
}

