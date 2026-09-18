package fr.trophyquest.backend.api.game.details.services;

import fr.trophyquest.backend.api.game.details.dto.GameSuiteItem;
import fr.trophyquest.backend.api.game.details.mappers.GameSuiteItemMapper;
import fr.trophyquest.backend.domain.repository.SuiteRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GameDetailsSuiteService {

    private final SuiteRepository suiteRepository;
    private final GameSuiteItemMapper gameSuiteItemMapper;

    public GameDetailsSuiteService(SuiteRepository suiteRepository,
                                   GameSuiteItemMapper gameSuiteItemMapper) {
        this.suiteRepository = suiteRepository;
        this.gameSuiteItemMapper = gameSuiteItemMapper;
    }


    /**
     * Fetch all suites linked to a game.
     *
     * @param gameId ID of the game
     * @return A list of suites
     */
    public List<GameSuiteItem> fetchSuitesByGameId(long gameId) {
        return this.suiteRepository.findAllByGameId(gameId).stream()
                .map(this.gameSuiteItemMapper::fromSuite)
                .collect(Collectors.toList());
    }
}
