package fr.trophyquest.backend.service;

import fr.trophyquest.backend.api.dto.game.GameDetailsDTO;
import fr.trophyquest.backend.api.dto.trophysuite.TrophySuiteWithCountsDTO;
import fr.trophyquest.backend.api.mapper.GameDetailsMapper;
import fr.trophyquest.backend.repository.GameRepository;
import fr.trophyquest.backend.repository.RecentGameSearchItemRepository;
import fr.trophyquest.backend.repository.TrophySuiteRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class GameService {

    private final GameRepository gameRepository;
    private final RecentGameSearchItemRepository recentGameSearchItemRepository;
    private final TrophySuiteRepository trophySuiteRepository;
    private final GameDetailsMapper gameDetailsMapper;

    public GameService(
            GameRepository gameRepository,
            RecentGameSearchItemRepository recentGameSearchItemRepository,
            TrophySuiteRepository trophySuiteRepository,
            GameDetailsMapper gameDetailsMapper
    ) {
        this.gameRepository = gameRepository;
        this.recentGameSearchItemRepository = recentGameSearchItemRepository;
        this.trophySuiteRepository = trophySuiteRepository;
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

    public List<TrophySuiteWithCountsDTO> fetchTrophySuites(UUID gameId) {
        return this.trophySuiteRepository.findByGameId(gameId).stream().toList();
    }
}
