import {Component, computed, Signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GameCoverStoreService} from '../../../core/stores/game-cover-store.service';
import {NgbNav, NgbNavContent, NgbNavItem, NgbNavLinkBase, NgbNavOutlet} from '@ng-bootstrap/ng-bootstrap';
import {GamePageStoreService} from '../../stores/game-page-store.service';
import {GamePageData} from '../../models/game-page-data';
import {GameDetailsComponent} from '../../game-details/game-details.component';

@Component({
  selector: 'tq-game-page',
  imports: [
    NgbNav,
    NgbNavItem,
    NgbNavLinkBase,
    NgbNavContent,
    NgbNavOutlet,
    GameDetailsComponent
  ],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.scss',
})
export class GamePageComponent {
  private readonly _routeData = {
    gameId: '',
    trophySuiteId: '',
  }
  public activeTab = 'presentation';

  readonly data: Signal<GamePageData> = computed(() => this._store.data());

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _gameCoverStoreService: GameCoverStoreService,
    private readonly _store: GamePageStoreService,
  ) {
    this._routeData.gameId = this._route.snapshot.paramMap.get('gameId')!;
    this._routeData.trophySuiteId = this._route.snapshot.paramMap.get('trophySuiteId') ?? '';
  }

  ngOnInit(): void {
    this._gameCoverStoreService.useGameCover(this._routeData.gameId);
    this._store.fetch(this._routeData.gameId);
  }

  ngOnDestroy() {
    this._store.reset();
  }

  updateActiveTab(tab: string) {
    this.activeTab = tab;
  }
}

