import {computed, inject, Injectable, signal} from '@angular/core';
import {PlayerApiService} from '../../core/api/services/player-api.service';
import {NotificationService} from '../../core/services/notification.service';
import {Pagination} from '../../core/api/dtos/pagination';
import {PlayerSearchItem} from '../../core/api/dtos/player/player-search-item';
import {catchError, finalize, of, Subject, switchMap} from 'rxjs';

@Injectable()
export class PlayersDataService {
  private readonly playerApiService: PlayerApiService = inject(PlayerApiService);
  private readonly notificationService = inject(NotificationService);
  private readonly pageSize = 20;
  private readonly _pagination = signal<Pagination<PlayerSearchItem> | null>(null);
  private readonly _isLoading = signal<boolean>(false);
  private readonly _isError = signal<boolean>(false);
  private readonly searchSubject = new Subject<number>();

  readonly pagination = computed(() => this._pagination() ?? {
    content: [],
    page: 0,
    total: 0,
    size: this.pageSize
  } as Pagination<PlayerSearchItem>);
  readonly isLoading = this._isLoading.asReadonly();
  readonly isError = this._isError.asReadonly();

  constructor() {
    this.searchSubject
      .pipe(
        switchMap(page => {
          this._isLoading.set(true);
          this._isError.set(false);

          return this.playerApiService.search(page, this.pageSize)
            .pipe(
              finalize(() => this._isLoading.set(false)),
              catchError(err => {
                console.error('Failed to load players', err);
                this._isError.set(true);
                this.notificationService.error('Failed to retrieve player list');
                return of(null);
              })
            )
        }),
      )
      .subscribe(pagination => {
        if (pagination !== null) {
          this._pagination.set(pagination);
        }
      });
  }

  reset(): void {
    this._pagination.set(null);
    this._isLoading.set(false);
    this._isError.set(false);
  }

  init(): void {
    this.reset();
    this.search(0);
  }

  search(page: number): void {
    this.searchSubject.next(page);
  }
}
