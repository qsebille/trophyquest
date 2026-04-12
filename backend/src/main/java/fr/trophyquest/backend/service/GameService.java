package fr.trophyquest.backend.service;

import fr.trophyquest.backend.api.dto.SearchDTO;
import fr.trophyquest.backend.api.dto.game.GameDetailsDTO;
import fr.trophyquest.backend.api.dto.player.GamePlayerDTO;
import fr.trophyquest.backend.api.dto.trophysuite.TrophySuiteWithCountsDTO;
import fr.trophyquest.backend.api.mapper.GameDetailsMapper;
import fr.trophyquest.backend.repository.GameRepository;
import fr.trophyquest.backend.repository.PlayedGameRepository;
import fr.trophyquest.backend.repository.RecentGameSearchItemRepository;
import fr.trophyquest.backend.repository.TrophySuiteRepository;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class GameService {

    private final GameRepository gameRepository;
    private final RecentGameSearchItemRepository recentGameSearchItemRepository;
    private final TrophySuiteRepository trophySuiteRepository;
    private final PlayedGameRepository playedGameRepository;
    private final GameDetailsMapper gameDetailsMapper;

    public GameService(
            GameRepository gameRepository,
            RecentGameSearchItemRepository recentGameSearchItemRepository,
            TrophySuiteRepository trophySuiteRepository,
            PlayedGameRepository playedGameRepository,
            GameDetailsMapper gameDetailsMapper
    ) {
        this.gameRepository = gameRepository;
        this.recentGameSearchItemRepository = recentGameSearchItemRepository;
        this.trophySuiteRepository = trophySuiteRepository;
        this.playedGameRepository = playedGameRepository;
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

    public SearchDTO<GamePlayerDTO> searchRecentPlayers(UUID gameId, int pageNumber, int pageSize) {
        List<GamePlayerDTO> recentPlayers = this.playedGameRepository.fetchRecentPlayersForGame(gameId,
                Pageable.ofSize(pageSize).withPage(pageNumber));
        long count = this.playedGameRepository.countByIdGameId(gameId);
        return SearchDTO.<GamePlayerDTO>builder()
                .content(recentPlayers)
                .total(count)
                .build();
    }
}
