package fr.trophyquest.backend.service;

import fr.trophyquest.backend.api.dto.game.GameCoverImageDTO;
import fr.trophyquest.backend.domain.entity.views.RecentGameSearchItem;
import fr.trophyquest.backend.repository.GameImageRepository;
import fr.trophyquest.backend.repository.PlayedTrophySuiteRepository;
import fr.trophyquest.backend.repository.RecentGameSearchItemRepository;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class CoverService {

    private final RecentGameSearchItemRepository recentGameSearchItemRepository;
    private final GameImageRepository gameImageRepository;
    private final PlayedTrophySuiteRepository playedTrophySuiteRepository;

    public CoverService(
            RecentGameSearchItemRepository recentGameSearchItemRepository,
            GameImageRepository gameImageRepository,
            PlayedTrophySuiteRepository playedTrophySuiteRepository
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
