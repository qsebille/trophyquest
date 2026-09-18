package fr.trophyquest.backend.api.controller;

import fr.trophyquest.backend.api.common.dto.Pagination;
import fr.trophyquest.backend.api.dto.player.PlayerDTO;
import fr.trophyquest.backend.api.dto.player.PlayerSearchItemDTO;
import fr.trophyquest.backend.api.dto.psn.PsnFetchResponse;
import fr.trophyquest.backend.service.PlayerService;
import fr.trophyquest.backend.service.PsnFetcherService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import software.amazon.awssdk.services.lambda.model.InvokeResponse;

import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/player")
public class PlayerController {
    private static final Logger logger = LoggerFactory.getLogger(PlayerController.class);

    private final PsnFetcherService psnFetcherService;
    private final PlayerService playerService;

    public PlayerController(
            PsnFetcherService psnFetcherService,
            PlayerService playerService
    ) {
        this.psnFetcherService = psnFetcherService;
        this.playerService = playerService;
    }

    @GetMapping("/search")
    public Pagination<PlayerSearchItemDTO> search(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "50") int size
    ) {
        return this.playerService.searchPlayers(page, size);
    }

    @DeleteMapping("{playerId}")
    public void delete(@PathVariable UUID playerId) {
        this.playerService.delete(playerId);
    }

    @GetMapping("/pseudo/{pseudo}")
    public Optional<PlayerDTO> findByPseudo(@PathVariable String pseudo) {
        return this.playerService.findByPseudo(pseudo);
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
