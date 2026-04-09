import {Component, computed} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GameCoverStoreService} from '../../../core/stores/game-cover-store.service';
import {NgbNav, NgbNavContent, NgbNavItem, NgbNavLinkButton, NgbNavOutlet} from '@ng-bootstrap/ng-bootstrap';
import {GamePageStoreService} from '../../stores/game-page-store.service';
import {GameDetailsComponent} from '../game-details/game-details.component';
import {GameTrophySuitesComponent} from '../game-trophy-suites/game-trophy-suites.component';
import {Location} from '@angular/common';

@Component({
  selector: 'tq-game-page',
  imports: [
    NgbNav,
    NgbNavItem,
    NgbNavLinkButton,
    NgbNavContent,
    NgbNavOutlet,
    GameDetailsComponent,
    GameTrophySuitesComponent
  ],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.scss',
})
export class GamePageComponent {
  private readonly _gameId: string;

  selectedTab = 'overview';
  selectedTrophySuiteId: string | null = null;

  readonly gameDetails = computed(() => this._store.gameDetails());
  readonly trophySuites = computed(() => this._store.trophySuites());
  readonly trophies = computed(() => this._store.trophies());

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _router: Router,
    private readonly _location: Location,
    private readonly _gameCoverStoreService: GameCoverStoreService,
    private readonly _store: GamePageStoreService,
  ) {
    this._gameId = this._route.snapshot.paramMap.get('gameId')!;
  }

  ngOnInit(): void {
    this._gameCoverStoreService.useGameCover(this._gameId);
    this._store.fetch(this._gameId);

    const queryParams = this._route.snapshot.paramMap;
    this.selectedTab = queryParams.get('tab') ?? 'overview';
    this.selectedTrophySuiteId = queryParams.get('tsId');
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
    this._store.fetchTrophies(tsId);
  }

  private _updateUrl(): void {
    const urlTree = this._router.createUrlTree([], {
      relativeTo: this._route,
      queryParams: {
        tab: this.selectedTab,
        tsId: this.selectedTrophySuiteId ?? null,
      },
      queryParamsHandling: 'merge',
    });

    this._location.replaceState(this._router.serializeUrl(urlTree));
  }
}

