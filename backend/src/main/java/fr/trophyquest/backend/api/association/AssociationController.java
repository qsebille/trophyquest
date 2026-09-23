package fr.trophyquest.backend.api.association;

import fr.trophyquest.backend.api.association.dto.AssociationItem;
import fr.trophyquest.backend.api.association.dto.ValidationBody;
import fr.trophyquest.backend.api.common.dto.Pagination;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/association")
public class AssociationController {
    private final AssociationSearchService associationSearchService;
    private final AssociationValidationService associationValidationService;

    public AssociationController(AssociationSearchService associationSearchService,
                                 AssociationValidationService associationValidationService) {
        this.associationSearchService = associationSearchService;
        this.associationValidationService = associationValidationService;
    }

    @GetMapping()
    public Pagination<AssociationItem> getAssociations(@RequestParam(name = "page") int page) {
        return this.associationSearchService.fetchAssociations(page);
    }

    @PostMapping("/validate")
    public Boolean validateAssociation(@RequestBody ValidationBody validationBody) {
        return this.associationValidationService.validateAssociation(validationBody.suiteId, validationBody.gameId);
    }

    @PostMapping("/reject")
    public Boolean rejectAssociation(@RequestBody ValidationBody validationBody) {
        return this.associationValidationService.rejectAllCandidates(validationBody.suiteId);
    }
}
