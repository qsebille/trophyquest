package fr.trophyquest.backend.service;

import fr.trophyquest.backend.api.dto.game.GameCoverImageDTO;
import fr.trophyquest.backend.domain.entity.views.RecentGameSearchItem;
import fr.trophyquest.backend.repository.RecentGameSearchItemRepository;
import fr.trophyquest.backend.repository.psn.PsnGameImageRepository;
import fr.trophyquest.backend.repository.psn.PsnPlayedTrophySuiteRepository;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class CoverService {

    private final RecentGameSearchItemRepository recentGameSearchItemRepository;
    private final PsnGameImageRepository gameImageRepository;
    private final PsnPlayedTrophySuiteRepository playedTrophySuiteRepository;

    public CoverService(
            RecentGameSearchItemRepository recentGameSearchItemRepository,
            PsnGameImageRepository gameImageRepository,
            PsnPlayedTrophySuiteRepository playedTrophySuiteRepository
    ) {
        this.recentGameSearchItemRepository = recentGameSearchItemRepository;
        this.gameImageRepository = gameImageRepository;
        this.playedTrophySuiteRepository = playedTrophySuiteRepository;
    }

    public GameCoverImageDTO fetchTopPlayedGameCover() {
        RecentGameSearchItem topRecentGame = this.recentGameSearchItemRepository.findTop();
        return this.gameImageRepository.fetchGameCoverImage(topRecentGame.getId());
    }

    public GameCoverImageDTO fetchLastPlayedTrophySuiteOfPlayer(UUID playerId) {
        UUID gameId = this.playedTrophySuiteRepository.findLastPlayedGameIdByPlayer(playerId);
        return this.gameImageRepository.fetchGameCoverImage(gameId);
    }

    public GameCoverImageDTO fetchForGame(UUID gameId) {
        return this.gameImageRepository.fetchGameCoverImage(gameId);
    }

}
