package fr.trophyquest.backend.api.controller;

import fr.trophyquest.backend.api.dto.game.BackgroundImageDTO;
import fr.trophyquest.backend.service.BackgroundImageService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/background-image")
public class BackgroundImageController {

    private final BackgroundImageService backgroundImageService;

    public BackgroundImageController(BackgroundImageService backgroundImageService) {
        this.backgroundImageService = backgroundImageService;
    }

    @GetMapping("/top-played-game")
    public BackgroundImageDTO fetchTopPlayedGameBackgroundImage() {
        return this.backgroundImageService.fetchTopPlayedGameBackgroundUrl();
    }

    @GetMapping("/player/{playerId}")
    public BackgroundImageDTO fetchPlayerBackgroundImage(@PathVariable UUID playerId) {
        return this.backgroundImageService.fetchLastPlayedTrophySuiteOfPlayer(playerId);
    }

    @GetMapping("/game/{gameId}")
    public BackgroundImageDTO fetchForGame(@PathVariable UUID gameId) {
        return this.backgroundImageService.fetchForGame(gameId);
    }

}