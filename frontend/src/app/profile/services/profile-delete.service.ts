import {inject, Injectable} from '@angular/core';
import {NotificationService} from '../../core/services/notification.service';
import {NavigatorService} from '../../core/services/navigator.service';
import {PlayerApiService} from '../../core/api/services/player-api.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileDeleteService {
  private readonly playerApiService = inject(PlayerApiService);
  private readonly notificationService = inject(NotificationService);
  private readonly navigatorService = inject(NavigatorService);

  deleteProfile(playerId: string): void {
    this.playerApiService.deletePlayer(playerId)
      .subscribe({
        next: () => {
          this.notificationService.success('Profile deleted successfully');
          this.navigatorService.goToPlayersPage();
        },
        error: error => {
          console.error('Failed to delete profile: ', error);
          this.notificationService.error('Failed to delete profile');
        }
      });
  }
}
