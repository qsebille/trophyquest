import {Component, inject, OnInit} from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {NavigatorService} from "../../core/services/navigator.service";
import {AddPlayerFormComponent} from "../components/add-player-form/add-player-form.component";
import {PlayerListComponent} from "../components/player-list/player-list.component";
import {BackgroundImageService} from "../../core/stores/background-image.service";
import {PlayersAddService} from '../services/players-add.service';
import {SpinnerContainerComponent} from '../../core/components/spinner-container/spinner-container.component';
import {PlayersDataService} from '../services/players-data.service';
import {catchError, EMPTY, exhaustMap, filter, Subject, tap} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  imports: [
    MatProgressSpinnerModule,
    AddPlayerFormComponent,
    PlayerListComponent,
    SpinnerContainerComponent,
  ],
  providers: [
    PlayersDataService,
    PlayersAddService,
  ],
  templateUrl: './players-page.component.html',
  styleUrl: './players-page.component.scss',
})
export class PlayersPageComponent implements OnInit {
  private readonly backgroundImageService = inject(BackgroundImageService);
  private readonly playersDataService = inject(PlayersDataService);
  private readonly playersAddService = inject(PlayersAddService);
  private readonly navigator = inject(NavigatorService);
  private readonly addPlayerSubject = new Subject<string>();

  readonly paginatedPlayers = this.playersDataService.pagination;
  readonly isLoadingPlayerList = this.playersDataService.isLoading;
  readonly listLoadingError = this.playersDataService.isError;
  readonly isLoadingAddPlayerForm = this.playersAddService.isLoading;

  constructor() {
    this.addPlayerSubject.pipe(
      exhaustMap(pseudo =>
        this.playersAddService.addPlayer$(pseudo).pipe(
          filter(response => response.status === 'OK'),
          tap(() => this.playersDataService.init()),
          catchError(error => {
            console.error(error);
            return EMPTY;
          })
        )
      ),
      takeUntilDestroyed()
    ).subscribe();
  }

  ngOnInit(): void {
    this.playersDataService.init();
    this.backgroundImageService.useTopPlayedGame();
  }

  ngOnDestroy(): void {
    this.playersDataService.reset();
  }

  loadPageOfPlayers(page: number): void {
    this.playersDataService.search(page);
  }

  addPlayer(pseudo: string): void {
    this.addPlayerSubject.next(pseudo);
  }

  goToProfilePage(playerId: string): void {
    this.navigator.goToProfilePage(playerId);
  }
}
