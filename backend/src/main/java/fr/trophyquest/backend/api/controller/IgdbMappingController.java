package fr.trophyquest.backend.api.controller;

import fr.trophyquest.backend.api.dto.SearchDTO;
import fr.trophyquest.backend.api.dto.igdb.IgdbMappingDTO;
import fr.trophyquest.backend.api.dto.igdb.IgdbMappingStatsDTO;
import fr.trophyquest.backend.service.IgdbCandidateService;
import fr.trophyquest.backend.service.IgdbMappingService;
import org.springframework.web.bind.annotation.*;

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
    public SearchDTO<IgdbMappingDTO> search(
            @RequestParam(name = "pageNumber", defaultValue = "0") int pageNumber,
            @RequestParam(name = "pageSize", defaultValue = "50") int pageSize
    ) {
        return this.igdbCandidateService.searchMappingToValidate(pageNumber, pageSize);
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
