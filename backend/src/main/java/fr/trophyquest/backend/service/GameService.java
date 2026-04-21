package fr.trophyquest.backend.service;

import fr.trophyquest.backend.api.dto.SearchDTO;
import fr.trophyquest.backend.api.dto.game.GameDetailsDTO;
import fr.trophyquest.backend.api.dto.game.GameSearchItemDTO;
import fr.trophyquest.backend.api.dto.player.GamePlayerDTO;
import fr.trophyquest.backend.api.dto.trophysuite.TrophySuiteWithCountsDTO;
import fr.trophyquest.backend.api.mapper.GameMapper;
import fr.trophyquest.backend.repository.GameRepository;
import fr.trophyquest.backend.repository.PlayedGameRepository;
import fr.trophyquest.backend.repository.PsnGameRepository;
import fr.trophyquest.backend.repository.RecentGameSearchItemRepository;
import fr.trophyquest.backend.repository.TrophySuiteRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class GameService {
    private final PsnGameRepository psnGameRepository;
    private final GameRepository gameRepository;
    private final RecentGameSearchItemRepository recentGameSearchItemRepository;
    private final TrophySuiteRepository trophySuiteRepository;
    private final PlayedGameRepository playedGameRepository;
    private final GameMapper gameMapper;

    public GameService(
            PsnGameRepository psnGameRepository,
            GameRepository gameRepository,
            RecentGameSearchItemRepository recentGameSearchItemRepository,
            TrophySuiteRepository trophySuiteRepository,
            PlayedGameRepository playedGameRepository,
            GameMapper gameMapper
    ) {
        this.psnGameRepository = psnGameRepository;
        this.gameRepository = gameRepository;
        this.recentGameSearchItemRepository = recentGameSearchItemRepository;
        this.trophySuiteRepository = trophySuiteRepository;
        this.playedGameRepository = playedGameRepository;
        this.gameMapper = gameMapper;
    }

    public long count() {
        return this.psnGameRepository.count();
    }

    public Page<GameSearchItemDTO> search(String searchTerm, int pageNumber, int pageSize) {
        Pageable pagination = Pageable.ofSize(pageSize).withPage(pageNumber);
        if (searchTerm == null || searchTerm.isEmpty()) {
            return this.gameRepository.findAll(pagination)
                    .map(this.gameMapper::toGameSearchItemDTO);
        }

        return this.gameRepository.findGamesByNameContainsIgnoreCase(searchTerm, pagination)
                .map(this.gameMapper::toGameSearchItemDTO);
    }

    public long countRecentlyPlayed() {
        return this.recentGameSearchItemRepository.count();
    }

    public GameDetailsDTO fetchDetails(UUID gameId) {
        return this.psnGameRepository.fetchGameWithIgdbDetailsById(gameId)
                .map(this.gameMapper::toGameDetailsDTO)
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
