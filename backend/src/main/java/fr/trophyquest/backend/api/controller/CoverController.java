package fr.trophyquest.backend.api.controller;

import fr.trophyquest.backend.api.dto.game.GameCoverImageDTO;
import fr.trophyquest.backend.service.CoverService;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/cover")
@CrossOrigin(origins = "*")
public class CoverController {

    private final CoverService coverService;

    public CoverController(CoverService coverService) {
        this.coverService = coverService;
    }

    @GetMapping("/random")
    public GameCoverImageDTO fetchRandomCover() {
        return this.coverService.fetchRandomCoverImageUrl();
    }

    @GetMapping("/top-played-game")
    public GameCoverImageDTO fetchTopPlayedGameCover() {
        return this.coverService.fetchTopPlayedGameCover();
    }

    @GetMapping("/player/{playerId}/last-played-trophy-suite")
    public GameCoverImageDTO fetchLastPlayedTrophySuiteOfPlayer(@PathVariable UUID playerId) {
        return this.coverService.fetchLastPlayedTrophySuiteOfPlayer(playerId);
    }

    @GetMapping("/trophy-suite/{trophySuiteId}")
    public GameCoverImageDTO fetchForTrophySuite(@PathVariable UUID trophySuiteId) {
        return this.coverService.fetchForTrophySuite(trophySuiteId);
    }

    @GetMapping("/game/{gameId}")
    public GameCoverImageDTO fetchForGame(@PathVariable UUID gameId) {
        return this.coverService.fetchForGame(gameId);
    }

}