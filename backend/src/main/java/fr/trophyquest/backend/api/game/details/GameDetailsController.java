package fr.trophyquest.backend.api.game.details;


import fr.trophyquest.backend.api.common.dto.BackgroundImageResponse;
import fr.trophyquest.backend.api.common.dto.Pagination;
import fr.trophyquest.backend.api.game.details.dto.GameDetailsResponse;
import fr.trophyquest.backend.api.game.details.dto.GamePlayerItem;
import fr.trophyquest.backend.api.game.details.dto.GameSuiteItem;
import fr.trophyquest.backend.api.game.details.dto.GameTrophyItem;
import fr.trophyquest.backend.api.game.details.services.GameDetailsBackgroundService;
import fr.trophyquest.backend.api.game.details.services.GameDetailsPlayerService;
import fr.trophyquest.backend.api.game.details.services.GameDetailsService;
import fr.trophyquest.backend.api.game.details.services.GameDetailsSuiteService;
import fr.trophyquest.backend.api.game.details.services.GameDetailsTrophyService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/game-details")
public class GameDetailsController {

    private final GameDetailsService gameDetailsService;
    private final GameDetailsPlayerService gameDetailsPlayerService;
    private final GameDetailsSuiteService gameDetailsSuiteService;
    private final GameDetailsTrophyService gameDetailsTrophyService;
    private final GameDetailsBackgroundService gameDetailsBackgroundService;


    public GameDetailsController(GameDetailsService gameDetailsService,
                                 GameDetailsPlayerService gameDetailsPlayerService,
                                 GameDetailsSuiteService gameDetailsSuiteService,
                                 GameDetailsTrophyService gameDetailsTrophyService,
                                 GameDetailsBackgroundService gameDetailsBackgroundService) {
        this.gameDetailsService = gameDetailsService;
        this.gameDetailsPlayerService = gameDetailsPlayerService;
        this.gameDetailsSuiteService = gameDetailsSuiteService;
        this.gameDetailsTrophyService = gameDetailsTrophyService;
        this.gameDetailsBackgroundService = gameDetailsBackgroundService;
    }

    @GetMapping("/by-game/{gameId}")
    public GameDetailsResponse fetchDetailsByGameId(@PathVariable long gameId) {
        return gameDetailsService.fetchDetailsByGameId(gameId);
    }

    @GetMapping("/by-suite/{suiteId}")
    public GameDetailsResponse fetchDetailsBySuiteId(@PathVariable UUID suiteId) {
        return gameDetailsService.fetchDetailsBySuiteId(suiteId);
    }

    @GetMapping("/by-game/{gameId}/suites")
    public List<GameSuiteItem> fetchSuitesByGameId(@PathVariable long gameId) {
        return gameDetailsSuiteService.fetchSuitesByGameId(gameId);
    }

    @GetMapping("/by-game/{gameId}/players")
    public Pagination<GamePlayerItem> searchPlayersByGameId(@PathVariable long gameId,
                                                            @RequestParam(name = "page", defaultValue = "0") int page,
                                                            @RequestParam(name = "size", defaultValue = "10") int size) {
        return gameDetailsPlayerService.searchPlayersByGameId(gameId, page, size);
    }

    @GetMapping("/by-suite/{suiteId}/players")
    public Pagination<GamePlayerItem> fetchPlayersBySuiteId(@PathVariable UUID suiteId,
                                                            @RequestParam(name = "page", defaultValue = "0") int page,
                                                            @RequestParam(name = "size", defaultValue = "10") int size) {
        return gameDetailsPlayerService.searchPlayersBySuiteId(suiteId, page, size);
    }

    @GetMapping("/by-suite/{suiteId}/trophies")
    public List<GameTrophyItem> fetchTrophiesBySuiteId(@PathVariable UUID suiteId,
                                                       @RequestParam(name = "playerId", required = false) Optional<UUID> playerId) {
        return gameDetailsTrophyService.fetchTrophiesBySuiteIdAndPlayerId(suiteId, playerId);
    }

    @GetMapping("/by-game/{gameId}/background")
    public BackgroundImageResponse fetchBackgroundByGameId(@PathVariable long gameId) {
        return gameDetailsBackgroundService.fetchBackgroundByGameId(gameId);
    }

}
