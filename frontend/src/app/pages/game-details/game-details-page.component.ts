import {Component, computed, effect, inject, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {BackgroundImageService} from '../../core/stores/background-image.service';
import {NgbNav, NgbNavContent, NgbNavItem, NgbNavLinkButton, NgbNavOutlet} from '@ng-bootstrap/ng-bootstrap';
import {GameDetailsComponent} from '../../game/components/game-details/game-details.component';
import {GamePlayersComponent} from '../../game/components/game-players/game-players.component';
import {NavigatorService} from '../../core/services/navigator.service';
import {
  GameTrophySuiteListComponent
} from '../../game/components/trophy-suite/game-trophy-suite-list/game-trophy-suite-list.component';
import {GameDetailsStoreService} from './services/stores/game-details-store.service';
import {GamePlayersStoreService} from './services/stores/game-players-store.service';
import {GameTrophyStoreService} from './services/stores/game-trophy-store.service';
import {GameSuiteStoreService} from './services/stores/game-suite-store.service';

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
    GameTrophySuiteListComponent,
  ],
  providers: [
    GameDetailsStoreService,
    GamePlayersStoreService,
    GameTrophyStoreService,
  ],
  templateUrl: './game-details-page.component.html',
  styleUrl: './game-details-page.component.scss',
})
export class GameDetailsPageComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly backgroundImageService = inject(BackgroundImageService);
  private readonly gameDetailsStoreService = inject(GameDetailsStoreService);
  private readonly gamePlayersStoreService = inject(GamePlayersStoreService);
  private readonly gameSuiteStoreService = inject(GameSuiteStoreService);
  private readonly gameTrophyStoreService = inject(GameTrophyStoreService);
  private readonly navigator = inject(NavigatorService);

  private readonly gameId = this.route.snapshot.paramMap.get('gameId')!;

  private readonly queryParamMap = toSignal(this.route.queryParamMap, {initialValue: this.route.snapshot.queryParamMap});

  readonly selectedTab = computed(() => this.queryParamMap().get('tab') ?? 'overview');
  readonly selectedTrophySuiteId = computed(() => this.queryParamMap().get('trophySuiteId'));
  readonly selectedPlayerId = computed(() => this.queryParamMap().get('playerId'));
  readonly gameDetails = this.gameDetailsStoreService.gameDetails;
  readonly gameDetailsInError = this.gameDetailsStoreService.hasError;
  readonly suites = this.gameSuiteStoreService.suites;
  readonly suitesInError = this.gameSuiteStoreService.hasError;
  readonly trophies = this.gameTrophyStoreService.trophies;
  readonly trophiesInError = this.gameTrophyStoreService.hasError;
  readonly playersPagination = this.gamePlayersStoreService.playersPagination;
  readonly playersInError = this.gamePlayersStoreService.hasError;

  constructor() {
    effect(() => {
      const trophySuiteId = this.selectedTrophySuiteId();
      const playerId = this.selectedPlayerId();
      if (trophySuiteId !== null) {
        this.gameTrophyStoreService.fetchTrophies(trophySuiteId, playerId);
      }
    });
  }

  ngOnInit(): void {
    this.backgroundImageService.useGameBackground(this.gameId);
    this.gameDetailsStoreService.fetchByGameId(this.gameId);
    this.gamePlayersStoreService.fetchForGame(this.gameId, 0);
    this.gameSuiteStoreService.fetchSuites(this.gameId);
  }

  ngOnDestroy(): void {
    this.gameDetailsStoreService.reset();
    this.gamePlayersStoreService.reset();
    this.gameTrophyStoreService.reset();
  }

  onTabChange(tab: string): void {
    this.updateUrl({tab});
  }

  onTrophySuiteSelectedChange(trophySuiteId: string | null): void {
    this.updateUrl({trophySuiteId});
  }

  onPlayerPageChange(page: number): void {
    this.gamePlayersStoreService.fetchForGame(this.gameId, page);
  }

  onPlayerSelected(playerId: string): void {
    this.updateUrl({tab: 'trophies', playerId});
  }

  goToProfilePage(playerId: string): void {
    this.navigator.goToProfilePage(playerId);
  }

  private updateUrl(queryParams: Record<string, string | null>): void {
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }
}
