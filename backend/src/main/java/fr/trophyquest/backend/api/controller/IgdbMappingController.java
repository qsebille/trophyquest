package fr.trophyquest.backend.api.controller;

import fr.trophyquest.backend.service.IgdbCandidateService;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/igdb-mapping")
public class IgdbMappingController {

    private final IgdbCandidateService igdbCandidateService;

    public IgdbMappingController(IgdbCandidateService igdbCandidateService) {
        this.igdbCandidateService = igdbCandidateService;
    }

    @PostMapping("/{gameId}/candidate/{igdbGameId}/validate")
    public Boolean validateCandidate(@PathVariable UUID gameId, @PathVariable long igdbGameId) {
        return this.igdbCandidateService.validateCandidate(gameId, igdbGameId);
    }

    @PutMapping("/{gameId}/candidate/reject-all")
    public Boolean rejectAllCandidates(@PathVariable UUID gameId) {
        return this.igdbCandidateService.rejectAllPendingCandidates(gameId);
    }

}
