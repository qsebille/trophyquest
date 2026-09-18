package fr.trophyquest.backend.api.association;

import fr.trophyquest.backend.api.association.dto.AssociationItem;
import fr.trophyquest.backend.api.common.dto.Pagination;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/association")
public class AssociationController {
    private final AssociationService associationService;

    public AssociationController(AssociationService associationService) {
        this.associationService = associationService;
    }

    @GetMapping()
    public Pagination<AssociationItem> getAssociations(@RequestParam(name = "page") int page) {
        return this.associationService.fetchAssociations(page);
    }
}
