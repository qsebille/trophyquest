package fr.trophyquest.backend.api.background;

import fr.trophyquest.backend.api.common.dto.BackgroundImageResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/background")
public class BackgroundController {

    private final BackgroundService backgroundService;

    public BackgroundController(BackgroundService backgroundService) {
        this.backgroundService = backgroundService;
    }

    @GetMapping("/home")
    public BackgroundImageResponse fetchForHome() {
        return this.backgroundService.fetchForHome();
    }

    @GetMapping("/player/{playerId}")
    public BackgroundImageResponse fetchForPlayer(@PathVariable UUID playerId) {
        return this.backgroundService.fetchForPlayer(playerId);
    }

    @GetMapping("/game/{gameId}")
    public BackgroundImageResponse fetchGameBackground(@PathVariable long gameId) {
        return this.backgroundService.fetchForGame(gameId);
    }

}