package fr.trophyquest.backend.service;

import fr.trophyquest.backend.api.dto.PaginationDTO;
import fr.trophyquest.backend.api.dto.game.GameDetailsDTO;
import fr.trophyquest.backend.api.dto.game.GameSearchItemDTO;
import fr.trophyquest.backend.api.dto.player.PlayedGameDTO;
import fr.trophyquest.backend.api.dto.trophysuite.TrophySuiteWithCountsDTO;
import fr.trophyquest.backend.api.mapper.GameMapper;
import fr.trophyquest.backend.api.mapper.PlayedGameMapper;
import fr.trophyquest.backend.repository.GameRepository;
import fr.trophyquest.backend.repository.RecentGameSearchItemRepository;
import fr.trophyquest.backend.repository.psn.PsnGameRepository;
import fr.trophyquest.backend.repository.psn.PsnPlayedGameRepository;
import fr.trophyquest.backend.repository.psn.PsnTrophySuiteRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class GameService {
    private final PsnGameRepository psnGameRepository;
    private final GameRepository gameRepository;
    private final RecentGameSearchItemRepository recentGameSearchItemRepository;
    private final PsnTrophySuiteRepository trophySuiteRepository;
    private final PsnPlayedGameRepository playedGameRepository;
    private final GameMapper gameMapper;
    private final PlayedGameMapper playedGameMapper;

    public GameService(
            PsnGameRepository psnGameRepository,
            GameRepository gameRepository,
            RecentGameSearchItemRepository recentGameSearchItemRepository,
            PsnTrophySuiteRepository trophySuiteRepository,
            PsnPlayedGameRepository playedGameRepository,
            GameMapper gameMapper,
            PlayedGameMapper playedGameMapper
    ) {
        this.psnGameRepository = psnGameRepository;
        this.gameRepository = gameRepository;
        this.recentGameSearchItemRepository = recentGameSearchItemRepository;
        this.trophySuiteRepository = trophySuiteRepository;
        this.playedGameRepository = playedGameRepository;
        this.gameMapper = gameMapper;
        this.playedGameMapper = playedGameMapper;
    }

    public long count() {
        return this.psnGameRepository.count();
    }

    public PaginationDTO<GameSearchItemDTO> search(String searchTerm, int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by(
                Sort.Order.desc("nbPlayers"),
                Sort.Order.asc("name")
        ));
        if (searchTerm == null || searchTerm.isEmpty()) {
            Page<GameSearchItemDTO> result = this.gameRepository.findAll(pageable)
                    .map(this.gameMapper::toGameSearchItemDTO);
            return new PaginationDTO<>(result);
        }

        Page<GameSearchItemDTO> result = this.gameRepository.findGamesByNameContainsIgnoreCase(searchTerm, pageable)
                .map(this.gameMapper::toGameSearchItemDTO);
        return new PaginationDTO<>(result);
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

    public PaginationDTO<PlayedGameDTO> searchRecentPlayers(UUID gameId, int page, int size) {
        Pageable pagination = PageRequest.of(page, size, Sort.by("lastPlayedAt").descending());
        Page<PlayedGameDTO> playedGames = this.playedGameRepository.findAllByIdGameId(gameId, pagination)
                .map(this.playedGameMapper::toDTO);

        return new PaginationDTO<>(playedGames);
    }
}
