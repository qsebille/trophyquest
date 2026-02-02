package fr.trophyquest.backend.api.controller;

import fr.trophyquest.backend.api.dto.SearchDTO;
import fr.trophyquest.backend.api.dto.game.RecentGameDTO;
import fr.trophyquest.backend.service.GameService;
import fr.trophyquest.backend.service.RecentGameService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/game")
@CrossOrigin(origins = "*")
public class GameController {

    private final GameService gameService;
    private final RecentGameService recentGameService;

    public GameController(GameService gameService, RecentGameService recentGameService) {
        this.gameService = gameService;
        this.recentGameService = recentGameService;
    }

    @GetMapping("/count")
    public long count() {
        return this.gameService.count();
    }

    @GetMapping("/recent/count")
    public long countRecent() {
        return this.gameService.countRecentlyPlayed();
    }

    @GetMapping("/recent/search")
    public SearchDTO<RecentGameDTO> searchRecent(
            @RequestParam(name = "pageNumber", defaultValue = "0") int pageNumber,
            @RequestParam(name = "pageSize", defaultValue = "50") int pageSize
    ) {
        return this.recentGameService.search(pageNumber, pageSize);
    }

}