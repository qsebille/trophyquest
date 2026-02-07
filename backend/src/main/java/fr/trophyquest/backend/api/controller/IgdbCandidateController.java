package fr.trophyquest.backend.api.controller;

import fr.trophyquest.backend.api.dto.SearchDTO;
import fr.trophyquest.backend.api.dto.igdb.IgdbMappingDTO;
import fr.trophyquest.backend.service.IgdbCandidateService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/igdb-candidate")
@CrossOrigin(origins = "*")
public class IgdbCandidateController {

    private final IgdbCandidateService igdbCandidateService;

    public IgdbCandidateController(IgdbCandidateService igdbCandidateService) {
        this.igdbCandidateService = igdbCandidateService;
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

}
