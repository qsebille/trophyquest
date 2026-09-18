package fr.trophyquest.backend.api.background;

import fr.trophyquest.backend.api.common.dto.BackgroundImageResponse;
import fr.trophyquest.backend.api.exception.GameNotFoundException;
import fr.trophyquest.backend.domain.entity.Game;
import fr.trophyquest.backend.domain.entity.PlayedSuite;
import fr.trophyquest.backend.domain.projection.RecentGameProjection;
import fr.trophyquest.backend.domain.repository.GameRepository;
import fr.trophyquest.backend.domain.repository.PlayedGameRepository;
import fr.trophyquest.backend.domain.repository.PlayedSuiteRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.UUID;

@Service
public class BackgroundService {
    private final PlayedGameRepository playedGameRepository;
    private final PlayedSuiteRepository playedSuiteRepository;
    private final GameRepository gameRepository;

    public BackgroundService(PlayedGameRepository playedGameRepository,
                             PlayedSuiteRepository playedSuiteRepository,
                             GameRepository gameRepository) {
        this.playedGameRepository = playedGameRepository;
        this.playedSuiteRepository = playedSuiteRepository;
        this.gameRepository = gameRepository;
    }

    /**
     * Fetch the background image for the home page. Returns the background image of the most played game.
     *
     * @return A background image response
     */
    public BackgroundImageResponse fetchForHome() {
        Instant recentLimit = Instant.now().minus(7, ChronoUnit.DAYS);
        RecentGameProjection topGame = this.playedGameRepository.searchTopRecent(recentLimit, 1).getFirst();
        return BackgroundImageResponse.builder().url(topGame.getBackgroundUrl()).build();
    }

    /**
     * Fetch the background image for a player. Returns the background image of the last played game by the player.
     *
     * @param playerId ID of the player
     * @return A background image response
     */
    public BackgroundImageResponse fetchForPlayer(UUID playerId) {
        Sort sort = Sort.by(Sort.Direction.DESC, "lastPlayedAt");
        Pageable pageable = PageRequest.of(0, 1, sort);
        PlayedSuite playerSuite = this.playedSuiteRepository.findAllByPlayerId(playerId, pageable).getContent().getFirst();
        Game game = playerSuite.getGame();
        if (null == game) {
            return BackgroundImageResponse.builder().build();
        } else {
            return BackgroundImageResponse.builder().url(game.getBackgroundUrl()).build();
        }
    }

    /**
     * Fetch the background image for a game. Returns the background image of the game.
     *
     * @param gameId ID of the game
     * @return A background image response
     */
    public BackgroundImageResponse fetchForGame(long gameId) {
        Game game = this.gameRepository.findFirstById(gameId)
                .orElseThrow(() -> new GameNotFoundException(gameId));
        return BackgroundImageResponse.builder().url(game.getBackgroundUrl()).build();
    }
}
