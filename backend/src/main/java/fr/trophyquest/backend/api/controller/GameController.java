package fr.trophyquest.backend.api.controller;

import fr.trophyquest.backend.api.dto.PaginationDTO;
import fr.trophyquest.backend.api.dto.game.GameDetailsDTO;
import fr.trophyquest.backend.api.dto.game.GameSearchItemDTO;
import fr.trophyquest.backend.api.dto.game.RecentGameDTO;
import fr.trophyquest.backend.api.dto.player.PlayedGameDTO;
import fr.trophyquest.backend.api.dto.trophysuite.TrophySuiteDTO;
import fr.trophyquest.backend.service.GameService;
import fr.trophyquest.backend.service.PlayedGameService;
import fr.trophyquest.backend.service.RecentGameService;
import fr.trophyquest.backend.service.TrophySuiteService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/game")
public class GameController {

    private final GameService gameService;
    private final RecentGameService recentGameService;
    private final PlayedGameService playedGameService;
    private final TrophySuiteService trophySuiteService;

    public GameController(
            GameService gameService,
            RecentGameService recentGameService,
            PlayedGameService playedGameService,
            TrophySuiteService trophySuiteService
    ) {
        this.gameService = gameService;
        this.recentGameService = recentGameService;
        this.playedGameService = playedGameService;
        this.trophySuiteService = trophySuiteService;
    }

    @GetMapping("/search")
    public PaginationDTO<GameSearchItemDTO> search(
            @RequestParam(name = "searchTerm", defaultValue = "") String searchTerm,
            @RequestParam(name = "page", defaultValue = "0") int pageNumber,
            @RequestParam(name = "size", defaultValue = "50") int pageSize
    ) {
        return this.gameService.search(searchTerm, pageNumber, pageSize);
    }

    @GetMapping("/recent/search")
    public PaginationDTO<RecentGameDTO> searchRecent(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "50") int size
    ) {
        return this.recentGameService.search(page, size);
    }

    @GetMapping("{gameId}/details")
    public GameDetailsDTO getGameDetails(@PathVariable UUID gameId) {
        return this.gameService.fetchDetails(gameId);
    }

    @GetMapping("/{gameId}/trophy-suites")
    public List<TrophySuiteDTO> searchTrophySuites(@PathVariable UUID gameId) {
        return this.trophySuiteService.findForGame(gameId);
    }

    @GetMapping("/{gameId}/players")
    public PaginationDTO<PlayedGameDTO> searchRecentPlayers(
            @PathVariable UUID gameId,
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "50") int size
    ) {
        return this.playedGameService.searchRecentPlayers(gameId, page, size);
    }
}