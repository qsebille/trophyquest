package fr.trophyquest.backend.api.controller;

import fr.trophyquest.backend.api.common.dto.Pagination;
import fr.trophyquest.backend.api.dto.game.GameSearchItemDTO;
import fr.trophyquest.backend.service.GameService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/game")
public class GameController {

    private final GameService gameService;

    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    @GetMapping("/search")
    public Pagination<GameSearchItemDTO> search(
            @RequestParam(name = "searchTerm", defaultValue = "") String searchTerm,
            @RequestParam(name = "page", defaultValue = "0") int pageNumber,
            @RequestParam(name = "size", defaultValue = "50") int pageSize
    ) {
        return this.gameService.search(searchTerm, pageNumber, pageSize);
    }

}