package fr.trophyquest.backend.api.game.details.services;

import fr.trophyquest.backend.api.exception.GameNotFoundException;
import fr.trophyquest.backend.api.game.details.dto.GameDetailsResponse;
import fr.trophyquest.backend.api.game.details.mappers.GameDetailsResponseMapper;
import fr.trophyquest.backend.domain.repository.GameRepository;
import fr.trophyquest.backend.domain.repository.SuiteRepository;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class GameDetailsService {

    private final GameRepository gameRepository;
    private final SuiteRepository suiteRepository;

    private final GameDetailsResponseMapper gameDetailsResponseMapper;

    public GameDetailsService(GameRepository gameRepository,
                              SuiteRepository suiteRepository,
                              GameDetailsResponseMapper gameDetailsResponseMapper) {
        this.gameRepository = gameRepository;
        this.suiteRepository = suiteRepository;
        this.gameDetailsResponseMapper = gameDetailsResponseMapper;
    }

    /**
     * Fetch game details by game id.
     *
     * @param gameId Game ID
     * @return Game details DTO
     */
    public GameDetailsResponse fetchDetailsByGameId(long gameId) {
        return this.gameRepository.findFirstById(gameId)
                .map(this.gameDetailsResponseMapper::fromGame)
                .orElseThrow(() -> new GameNotFoundException(gameId));
    }

    /**
     * Fetch game details by a suite id.
     *
     * @param suiteId Suite ID
     * @return Game details DTO
     */
    public GameDetailsResponse fetchDetailsBySuiteId(UUID suiteId) {
        return this.suiteRepository.findFirstById(suiteId)
                .map(this.gameDetailsResponseMapper::fromSuite)
                .orElseThrow(() -> new GameNotFoundException(suiteId));
    }

}
