package fr.trophyquest.backend.service;

import fr.trophyquest.backend.api.dto.game.GameDetailsDTO;
import fr.trophyquest.backend.api.mapper.GameDetailsMapper;
import fr.trophyquest.backend.repository.GameRepository;
import fr.trophyquest.backend.repository.RecentGameSearchItemRepository;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class GameService {

    private final GameRepository gameRepository;
    private final RecentGameSearchItemRepository recentGameSearchItemRepository;
    private final GameDetailsMapper gameDetailsMapper;

    public GameService(
            GameRepository gameRepository,
            RecentGameSearchItemRepository recentGameSearchItemRepository,
            GameDetailsMapper gameDetailsMapper
    ) {
        this.gameRepository = gameRepository;
        this.recentGameSearchItemRepository = recentGameSearchItemRepository;
        this.gameDetailsMapper = gameDetailsMapper;
    }

    public long count() {
        return this.gameRepository.count();
    }

    public long countRecentlyPlayed() {
        return this.recentGameSearchItemRepository.count();
    }

    public GameDetailsDTO fetchDetails(UUID gameId) {
        return this.gameRepository.fetchGameWithIgdbDetailsById(gameId)
                .map(this.gameDetailsMapper::toDTO)
                .orElseThrow(() -> new IllegalArgumentException("Game not found with id: " + gameId));
    }
}
