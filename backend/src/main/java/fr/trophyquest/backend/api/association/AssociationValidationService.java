package fr.trophyquest.backend.api.association;

import fr.trophyquest.backend.domain.repository.IgdbCandidateRepository;
import fr.trophyquest.backend.domain.repository.IgdbMatchingRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class AssociationValidationService {

    private final IgdbMatchingRepository igdbMatchingRepository;
    private final IgdbCandidateRepository igdbCandidateRepository;

    public AssociationValidationService(IgdbMatchingRepository igdbMatchingRepository,
                                        IgdbCandidateRepository igdbCandidateRepository) {
        this.igdbMatchingRepository = igdbMatchingRepository;
        this.igdbCandidateRepository = igdbCandidateRepository;
    }

    @Transactional
    public Boolean validateAssociation(UUID suiteId, int gameId) {
        try {
            igdbCandidateRepository.validateMatching(suiteId, gameId);
            igdbMatchingRepository.validateMatching(suiteId, gameId);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public Boolean rejectAllCandidates(UUID suiteId) {
        try {
            igdbCandidateRepository.rejectMatching(suiteId);
            igdbMatchingRepository.rejectMatching(suiteId);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

}
