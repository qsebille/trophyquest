import {Component, computed, input, output} from '@angular/core';
import {ActivePlayerTrophy} from '../../../core/api/dtos/player/active-player-trophy';
import {HomePlayerCardComponent} from '../home-player-card/home-player-card.component';
import {HomeTrophyCardComponent} from '../home-trophy-card/home-trophy-card.component';
import {HomeActivePlayer} from '../../models/home-active-player';

@Component({
  selector: 'tq-home-player-list',
  imports: [
    HomePlayerCardComponent,
    HomeTrophyCardComponent
  ],
  templateUrl: './home-player-list.component.html',
  styleUrl: './home-player-list.component.scss',
})
export class HomePlayerListComponent {
  readonly activePlayerTrophies = input<ActivePlayerTrophy[]>([]);

  readonly clickOnPlayer = output<string>();
  readonly clickOnGame = output<{ playerId: string, gameId: string, trophySuiteId: string }>();

  readonly hasNoRecentData = computed(() => this.activePlayerTrophies().length == 0);
  readonly activePlayerData = computed(() => {
    const grouped = new Map<string, HomeActivePlayer>();
    for (const activePlayerTrophy of this.activePlayerTrophies()) {
      const playerId = activePlayerTrophy.playerId;
      if (!grouped.has(playerId)) {
        grouped.set(playerId, {
          id: playerId,
          pseudo: activePlayerTrophy.playerPseudo,
          avatarUrl: activePlayerTrophy.playerAvatarUrl,
          nbRecentlyEarnedTrophies: activePlayerTrophy.nbRecentlyEarnedTrophies,
          trophies: [],
        });
      }

      grouped.get(playerId)!.trophies.push({
        id: activePlayerTrophy.trophyId,
        trophySuiteId: activePlayerTrophy.trophySuiteId,
        gameId: activePlayerTrophy.gameId,
        gameName: activePlayerTrophy.gameName,
        title: activePlayerTrophy.trophyTitle,
        trophyType: activePlayerTrophy.trophyType,
        iconUrl: activePlayerTrophy.trophyIconUrl,
        earnedAt: activePlayerTrophy.trophyEarnedAt,
      });
    }
    return Array.from(grouped.values());
  });
}
