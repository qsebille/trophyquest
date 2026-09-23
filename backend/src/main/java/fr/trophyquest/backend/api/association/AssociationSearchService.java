package fr.trophyquest.backend.api.association;

import fr.trophyquest.backend.api.association.dto.AssociationItem;
import fr.trophyquest.backend.api.association.mapper.AssociationItemMapper;
import fr.trophyquest.backend.api.common.dto.Pagination;
import fr.trophyquest.backend.domain.entity.Suite;
import fr.trophyquest.backend.domain.repository.SuiteRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class AssociationSearchService {

    private final SuiteRepository suiteRepository;
    private final AssociationItemMapper associationItemMapper;

    public AssociationSearchService(SuiteRepository suiteRepository,
                                    AssociationItemMapper associationItemMapper) {
        this.suiteRepository = suiteRepository;
        this.associationItemMapper = associationItemMapper;
    }

    public Pagination<AssociationItem> fetchAssociations(int page) {
        Sort sort = Sort.by("name");
        PageRequest pageRequest = PageRequest.of(page, 1, sort);
        Page<Suite> suites = suiteRepository.findByMatchingStatus("UNCERTAIN", pageRequest);

        return Pagination.<AssociationItem>builder()
                .total(suites.getTotalElements())
                .content(suites.getContent().stream()
                        .map(associationItemMapper::fromSuite)
                        .toList())
                .page(page)
                .build();
    }

}
