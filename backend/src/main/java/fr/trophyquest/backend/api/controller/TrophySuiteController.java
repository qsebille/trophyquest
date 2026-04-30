package fr.trophyquest.backend.api.controller;

import fr.trophyquest.backend.api.dto.trophy.TrophyDTO;
import fr.trophyquest.backend.service.TrophySuiteService;
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
public class TrophySuiteController {

    private final TrophySuiteService trophySuiteService;

    public TrophySuiteController(TrophySuiteService trophySuiteService) {
        this.trophySuiteService = trophySuiteService;
    }

    @GetMapping("/{trophySuiteId}/trophies")
    public List<TrophyDTO> getTrophies(
            @PathVariable UUID trophySuiteId,
            @RequestParam(name = "playerId", required = false) Optional<UUID> playerId
    ) {
        return this.trophySuiteService.fetchEarnedTrophies(trophySuiteId, playerId);
    }
}