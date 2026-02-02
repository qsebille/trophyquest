package fr.trophyquest.backend.api.controller;

import fr.trophyquest.backend.api.dto.SearchDTO;
import fr.trophyquest.backend.api.dto.player.PlayerDTO;
import fr.trophyquest.backend.api.dto.player.PlayerSearchItemDTO;
import fr.trophyquest.backend.api.dto.player.PlayerStatsDTO;
import fr.trophyquest.backend.api.dto.player.RecentPlayerTrophiesItemDTO;
import fr.trophyquest.backend.api.dto.psn.PsnFetchResponse;
import fr.trophyquest.backend.api.dto.trophy.EarnedTrophySearchItemDTO;
import fr.trophyquest.backend.api.dto.trophysuite.PlayedTrophySuiteSearchItemDTO;
import fr.trophyquest.backend.service.PlayedTrophySuiteSearchService;
import fr.trophyquest.backend.service.PlayerSearchService;
import fr.trophyquest.backend.service.PlayerService;
import fr.trophyquest.backend.service.PsnFetcherService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import software.amazon.awssdk.services.lambda.model.InvokeResponse;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/player")
@CrossOrigin(origins = "*")
public class PlayerController {
    private static final Logger logger = LoggerFactory.getLogger(PlayerController.class);

    private final PsnFetcherService psnFetcherService;
    private final PlayerService playerService;
    private final PlayerSearchService playerSearchService;
    private final PlayedTrophySuiteSearchService playedTrophySuiteSearchService;

    public PlayerController(
            PsnFetcherService psnFetcherService,
            PlayerService playerService,
            PlayerSearchService playerSearchService,
            PlayedTrophySuiteSearchService playedTrophySuiteSearchService
    ) {
        this.psnFetcherService = psnFetcherService;
        this.playerService = playerService;
        this.playerSearchService = playerSearchService;
        this.playedTrophySuiteSearchService = playedTrophySuiteSearchService;
    }

    @GetMapping("/search")
    public SearchDTO<PlayerSearchItemDTO> search(
            @RequestParam(name = "pageNumber", defaultValue = "0") int pageNumber,
            @RequestParam(name = "pageSize", defaultValue = "50") int pageSize
    ) {
        return this.playerSearchService.searchPlayers(pageNumber, pageSize);
    }

    @GetMapping("/count")
    public long count() {
        return this.playerService.count();
    }

    @GetMapping("/recent/count")
    public long countRecentlyActive() {
        return this.playerService.countRecentlyActive();
    }

    @GetMapping("{playerId}")
    public PlayerDTO fetch(@PathVariable UUID playerId) {
        return this.playerService.fetch(playerId);
    }

    @GetMapping("{playerId}/stats")
    public PlayerStatsDTO fetchWithStats(@PathVariable UUID playerId) {
        return this.playerService.fetchStats(playerId);
    }

    @GetMapping("{playerId}/trophy-suite/search")
    public SearchDTO<PlayedTrophySuiteSearchItemDTO> SearchPlayedTrophySuites(
            @PathVariable UUID playerId,
            @RequestParam(name = "pageNumber", defaultValue = "0") int pageNumber,
            @RequestParam(name = "pageSize", defaultValue = "50") int pageSize
    ) {
        return this.playedTrophySuiteSearchService.searchTrophySuitesOfPlayer(playerId, pageNumber, pageSize);
    }

    @GetMapping("{playerId}/trophy/search")
    public SearchDTO<EarnedTrophySearchItemDTO> searchEarnedTrophies(
            @PathVariable UUID playerId,
            @RequestParam(name = "pageNumber", defaultValue = "0") int pageNumber,
            @RequestParam(name = "pageSize", defaultValue = "50") int pageSize
    ) {
        return this.playerService.searchEarnedTrophies(playerId, pageNumber, pageSize);
    }

    @GetMapping("/pseudo/{pseudo}")
    public Optional<PlayerDTO> findByPseudo(@PathVariable String pseudo) {
        return this.playerService.findByPseudo(pseudo);
    }

    @GetMapping("/top-recent")
    public List<RecentPlayerTrophiesItemDTO> fetchTopRecent(
            @RequestParam(name = "playerLimit", defaultValue = "5") int playerLimit,
            @RequestParam(name = "trophyLimit", defaultValue = "5") int trophyLimit
    ) {
        return this.playerService.fetchTopRecent(playerLimit, trophyLimit);
    }

    @PostMapping("/{profileName}")
    public ResponseEntity<PsnFetchResponse> addProfile(@PathVariable String profileName) {
        try {
            InvokeResponse response = psnFetcherService.trigger(profileName);
            boolean hasFuncError = response.functionError() != null && !response.functionError().isBlank();
            PsnFetchResponse body = PsnFetchResponse.builder()
                    .status(hasFuncError ? "ERROR" : "OK")
                    .lambdaStatus(response.statusCode())
                    .functionError(hasFuncError)
                    .build();

            if (hasFuncError) {
                return ResponseEntity.status(502).body(body);
            }
            if (response.statusCode() == null || response.statusCode() >= 400) {
                return ResponseEntity.status(502).body(body);
            }

            return ResponseEntity.ok(body);
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            return ResponseEntity.status(502).body(new PsnFetchResponse("ERROR", 502, true));
        }
    }

}
