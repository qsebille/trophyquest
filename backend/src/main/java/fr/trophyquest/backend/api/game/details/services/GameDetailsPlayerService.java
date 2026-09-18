package fr.trophyquest.backend.api.game.details.services;

import fr.trophyquest.backend.api.common.dto.Pagination;
import fr.trophyquest.backend.api.game.details.dto.GamePlayerItem;
import fr.trophyquest.backend.api.game.details.mappers.GamePlayerItemMapper;
import fr.trophyquest.backend.domain.entity.PlayedGame;
import fr.trophyquest.backend.domain.entity.PlayedSuite;
import fr.trophyquest.backend.domain.repository.PlayedGameRepository;
import fr.trophyquest.backend.domain.repository.PlayedSuiteRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class GameDetailsPlayerService {

    private final PlayedGameRepository playedGameRepository;
    private final PlayedSuiteRepository playedSuiteRepository;

    private final GamePlayerItemMapper gamePlayerItemMapper;

    public GameDetailsPlayerService(PlayedGameRepository playedGameRepository,
                                    PlayedSuiteRepository playedSuiteRepository,
                                    GamePlayerItemMapper gamePlayerItemMapper) {
        this.playedGameRepository = playedGameRepository;
        this.playedSuiteRepository = playedSuiteRepository;
        this.gamePlayerItemMapper = gamePlayerItemMapper;
    }

    /**
     * Fetch players that played a game.
     *
     * @param gameId ID of the game
     * @param page   Page number for pagination
     * @param size   Page size for pagination
     * @return A paginated list of players that played the game
     */
    public Pagination<GamePlayerItem> searchPlayersByGameId(long gameId, int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size);
        Page<PlayedGame> playedGames = this.playedGameRepository.findByGameId(gameId, pageRequest);
        List<GamePlayerItem> content = playedGames.getContent().stream()
                .map(this.gamePlayerItemMapper::fromPlayedGame)
                .collect(Collectors.toList());
        return Pagination.<GamePlayerItem>builder()
                .content(content)
                .total(playedGames.getTotalElements())
                .page(page)
                .size(size)
                .build();
    }

    /**
     * Fetch players that played a suite.
     *
     * @param suiteId ID of the suite
     * @param page    Page number for pagination
     * @param size    Page size for pagination
     * @return A paginated list of players that played the suite
     */
    public Pagination<GamePlayerItem> searchPlayersBySuiteId(UUID suiteId, int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size);
        Page<PlayedSuite> playedSuites = this.playedSuiteRepository.findBySuiteId(suiteId, pageRequest);
        List<GamePlayerItem> content = playedSuites.getContent().stream()
                .map(this.gamePlayerItemMapper::fromPlayedSuite)
                .collect(Collectors.toList());
        return Pagination.<GamePlayerItem>builder()
                .content(content)
                .total(playedSuites.getTotalElements())
                .page(page)
                .size(size)
                .build();
    }
}
