import {Component, computed, inject, OnDestroy, OnInit} from '@angular/core';
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
export class GamePageComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly backgroundImageService = inject(BackgroundImageService);
  private readonly dataService = inject(GameDataService);
  private readonly navigator = inject(NavigatorService);

  private readonly gameId = this.route.snapshot.paramMap.get('gameId')!;

  private readonly queryParamMap = toSignal(this.route.queryParamMap, {initialValue: this.route.snapshot.queryParamMap});

  readonly selectedTab = computed(() => this.queryParamMap().get('tab') ?? 'overview');
  readonly selectedTrophySuiteId = computed(() => this.queryParamMap().get('trophySuiteId'));
  readonly selectedPlayerId = computed(() => this.queryParamMap().get('playerId'));

  readonly isError = this.dataService.isError;
  readonly gameDetails = this.dataService.gameDetails;
  readonly trophySuites = this.dataService.trophySuites;
  readonly trophies = this.dataService.trophies;
  readonly playersPagination = this.dataService.playersPagination;

  ngOnInit(): void {
    this.backgroundImageService.useGameBackground(this.gameId);

    this.dataService.fetchDetails(this.gameId);
    this.dataService.fetchPlayers(this.gameId, 0);

    if (this.selectedTrophySuiteId()) {
      this.refreshTrophies(
        this.selectedTrophySuiteId(),
        this.selectedPlayerId()
      );
    }
  }

  ngOnDestroy(): void {
    this.dataService.reset();
  }

  onTabChange(tab: string): void {
    this.updateUrl({tab});
  }

  onTrophySuiteSelectedChange(trophySuiteId: string | null): void {
    this.updateUrl({trophySuiteId});
    this.refreshTrophies(trophySuiteId, this.selectedPlayerId());
  }

  onPlayerPageChange(page: number): void {
    this.dataService.fetchPlayers(this.gameId, page);
  }

  onPlayerSelected(playerId: string): void {
    this.updateUrl({
      tab: 'trophies',
      playerId,
    });

    this.refreshTrophies(this.selectedTrophySuiteId(), playerId);
  }

  goToProfilePage(playerId: string): void {
    this.navigator.goToProfilePage(playerId);
  }

  private refreshTrophies(
    trophySuiteId: string | null,
    playerId: string | null
  ): void {
    this.dataService.fetchTrophies(trophySuiteId, playerId);
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
