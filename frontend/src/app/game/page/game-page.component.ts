import {Component, computed, effect, inject, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {BackgroundImageService} from '../../core/stores/background-image.service';
import {NgbNav, NgbNavContent, NgbNavItem, NgbNavLinkButton, NgbNavOutlet} from '@ng-bootstrap/ng-bootstrap';
import {GameDetailsComponent} from '../components/game-details/game-details.component';
import {GamePlayersComponent} from '../components/game-players/game-players.component';
import {NavigatorService} from '../../core/services/navigator.service';
import {
  GameTrophySuiteListComponent
} from '../components/trophy-suite/game-trophy-suite-list/game-trophy-suite-list.component';
import {GameDetailsDataService} from '../services/game-details-data.service';
import {GamePlayersDataService} from '../services/game-players-data.service';
import {GameTrophyDataService} from '../services/game-trophy-data.service';

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
    GameDetailsDataService,
    GamePlayersDataService,
    GameTrophyDataService,
  ],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.scss',
})
export class GamePageComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly backgroundImageService = inject(BackgroundImageService);
  private readonly gameDetailsDataService = inject(GameDetailsDataService);
  private readonly gamePlayersDataService = inject(GamePlayersDataService);
  private readonly gameTrophyDataService = inject(GameTrophyDataService);
  private readonly navigator = inject(NavigatorService);

  private readonly gameId = this.route.snapshot.paramMap.get('gameId')!;

  private readonly queryParamMap = toSignal(this.route.queryParamMap, {initialValue: this.route.snapshot.queryParamMap});

  readonly selectedTab = computed(() => this.queryParamMap().get('tab') ?? 'overview');
  readonly selectedTrophySuiteId = computed(() => this.queryParamMap().get('trophySuiteId'));
  readonly selectedPlayerId = computed(() => this.queryParamMap().get('playerId'));
  readonly gameDetails = this.gameDetailsDataService.gameDetails;
  readonly gameDetailsInError = this.gameDetailsDataService.hasError;
  readonly trophySuites = this.gameTrophyDataService.trophySuites;
  readonly trophySuitesInError = this.gameTrophyDataService.hasErrorInTrophySuites;
  readonly trophies = this.gameTrophyDataService.trophies;
  readonly trophiesInError = this.gameTrophyDataService.hasErrorInTrophies;
  readonly playersPagination = this.gamePlayersDataService.playersPagination;
  readonly playersInError = this.gamePlayersDataService.hasError;

  constructor() {
    effect(() => {
      const trophySuiteId = this.selectedTrophySuiteId();
      const playerId = this.selectedPlayerId();
      if (trophySuiteId !== null) {
        this.gameTrophyDataService.fetchTrophies(trophySuiteId, playerId);
      }
    });
  }

  ngOnInit(): void {
    this.backgroundImageService.useGameBackground(this.gameId);
    this.gameDetailsDataService.fetch(this.gameId);
    this.gamePlayersDataService.fetch(this.gameId, 0);
    this.gameTrophyDataService.fetchTrophySuites(this.gameId);
  }

  ngOnDestroy(): void {
    this.gameDetailsDataService.reset();
    this.gamePlayersDataService.reset();
    this.gameTrophyDataService.reset();
  }

  onTabChange(tab: string): void {
    this.updateUrl({tab});
  }

  onTrophySuiteSelectedChange(trophySuiteId: string | null): void {
    this.updateUrl({trophySuiteId});
  }

  onPlayerPageChange(page: number): void {
    this.gamePlayersDataService.fetch(this.gameId, page);
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
