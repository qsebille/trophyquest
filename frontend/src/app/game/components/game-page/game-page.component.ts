import {Component, computed} from '@angular/core';
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
  private readonly _gameId: string;

  selectedTab = 'overview';
  selectedTrophySuiteId: string | null = null;
  selectedPlayerId: string | null = null;

  readonly gameDetails = computed(() => this._store.gameDetails());
  readonly trophySuites = computed(() => this._store.trophySuites());
  readonly trophies = computed(() => this._store.trophies());
  readonly playersPagination = computed(() => this._store.playersPagination());

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _router: Router,
    private readonly _navigatorService: NavigatorService,
    private readonly _location: Location,
    private readonly _gameCoverStoreService: GameCoverStoreService,
    private readonly _store: GamePageStoreService,
  ) {
    this._gameId = this._route.snapshot.paramMap.get('gameId')!;
  }

  ngOnInit(): void {
    const queryParams = this._route.snapshot.queryParamMap;
    this.selectedTab = queryParams.get('tab') ?? 'overview';
    this.selectedTrophySuiteId = queryParams.get('tsId');
    this.selectedPlayerId = queryParams.get('playerId');

    this._gameCoverStoreService.useGameCover(this._gameId);
    this._store.fetchDetails(this._gameId);
    this._store.fetchPlayers(this._gameId, 0);
    if (!!this.selectedTrophySuiteId) {
      this._refreshTrophies(this.selectedTrophySuiteId);
    }
  }

  ngOnDestroy() {
    this._store.reset();
  }

  onTabChange(tab: string) {
    this.selectedTab = tab;
    this._updateUrl();
  }

  onTrophySuiteSelectedChange(tsId: string | null) {
    this.selectedTrophySuiteId = tsId;
    this._updateUrl();
    this._refreshTrophies(tsId);
  }

  private _updateUrl(): void {
    const urlTree = this._router.createUrlTree([], {
      relativeTo: this._route,
      queryParams: {
        tab: this.selectedTab,
        tsId: this.selectedTrophySuiteId ?? null,
        playerId: this.selectedPlayerId ?? null,
      },
      queryParamsHandling: 'merge',
    });

    this._location.replaceState(this._router.serializeUrl(urlTree));
  }

  onPlayerPageChange(page: number) {
    this._store.fetchPlayers(this._gameId, page);
  }

  onPlayerSelected(playerId: string) {
    this.selectedPlayerId = playerId;
    this.selectedTab = 'trophies';
    this._updateUrl();
    this._refreshTrophies(this.selectedTrophySuiteId);
  }

  onPlayerPseudoClicked(playerId: string) {
    this._navigatorService.goToProfilePage(playerId);
  }

  private _refreshTrophies(trophySuiteId: string | null): void {
    this._store.fetchTrophies(trophySuiteId, this.selectedPlayerId);
  }
}

