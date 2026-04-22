package fr.trophyquest.backend.api.controller;

import fr.trophyquest.backend.api.dto.PaginationDTO;
import fr.trophyquest.backend.api.dto.igdb.IgdbMappingDTO;
import fr.trophyquest.backend.api.dto.igdb.IgdbMappingStatsDTO;
import fr.trophyquest.backend.service.IgdbCandidateService;
import fr.trophyquest.backend.service.IgdbMappingService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/igdb-mapping")
public class IgdbMappingController {

    private final IgdbCandidateService igdbCandidateService;
    private final IgdbMappingService igdbMappingService;

    public IgdbMappingController(IgdbCandidateService igdbCandidateService, IgdbMappingService igdbMappingService) {
        this.igdbCandidateService = igdbCandidateService;
        this.igdbMappingService = igdbMappingService;
    }

    @GetMapping("/search")
    public PaginationDTO<IgdbMappingDTO> search(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "50") int size
    ) {
        return this.igdbCandidateService.searchMappingToValidate(page, size);
    }

    @PostMapping("/{gameId}/candidate/{igdbGameId}/validate")
    public Boolean validateCandidate(@PathVariable UUID gameId, @PathVariable long igdbGameId) {
        return this.igdbCandidateService.validateCandidate(gameId, igdbGameId);
    }

    @PutMapping("/{gameId}/candidate/reject-all")
    public Boolean rejectAllCandidates(@PathVariable UUID gameId) {
        return this.igdbCandidateService.rejectAllPendingCandidates(gameId);
    }

    @GetMapping("/stats")
    public IgdbMappingStatsDTO getStats() {
        return this.igdbMappingService.getStats();
    }

}
