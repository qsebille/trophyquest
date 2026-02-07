package fr.trophyquest.backend.api.controller;

import fr.trophyquest.backend.api.dto.game.TrophySuiteGameDTO;
import fr.trophyquest.backend.api.dto.trophy.EarnedTrophyDTO;
import fr.trophyquest.backend.api.dto.trophysuite.TrophySuiteDTO;
import fr.trophyquest.backend.service.TrophySuiteService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/trophy-suite")
@CrossOrigin(origins = "*")
public class TrophySuiteController {

    private final TrophySuiteService trophySuiteService;

    public TrophySuiteController(TrophySuiteService trophySuiteService) {
        this.trophySuiteService = trophySuiteService;
    }

    @GetMapping("/{trophySuiteId}")
    public TrophySuiteDTO retrieve(@PathVariable UUID trophySuiteId) {
        return this.trophySuiteService.retrieve(trophySuiteId);
    }

    @GetMapping("/{trophySuiteId}/trophies")
    public List<EarnedTrophyDTO> getTrophies(
            @PathVariable UUID trophySuiteId,
            @RequestParam(name = "playerId", required = false) Optional<UUID> playerId
    ) {
        return this.trophySuiteService.fetchEarnedTrophies(trophySuiteId, playerId);
    }

    @GetMapping("/{trophySuiteId}/game")
    public TrophySuiteGameDTO getGame(@PathVariable UUID trophySuiteId) {
        return this.trophySuiteService.fetchGameDetails(trophySuiteId);
    }

}