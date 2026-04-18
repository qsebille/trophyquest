package fr.trophyquest.backend.api.controller;

import fr.trophyquest.backend.api.dto.game.GameCoverImageDTO;
import fr.trophyquest.backend.service.CoverService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/cover")
public class CoverController {

    private final CoverService coverService;

    public CoverController(CoverService coverService) {
        this.coverService = coverService;
    }

    @GetMapping("/top-played-game")
    public GameCoverImageDTO fetchTopPlayedGameCover() {
        return this.coverService.fetchTopPlayedGameCover();
    }

    @GetMapping("/player/{playerId}/last-played-trophy-suite")
    public GameCoverImageDTO fetchLastPlayedTrophySuiteOfPlayer(@PathVariable UUID playerId) {
        return this.coverService.fetchLastPlayedTrophySuiteOfPlayer(playerId);
    }

    @GetMapping("/game/{gameId}")
    public GameCoverImageDTO fetchForGame(@PathVariable UUID gameId) {
        return this.coverService.fetchForGame(gameId);
    }

}