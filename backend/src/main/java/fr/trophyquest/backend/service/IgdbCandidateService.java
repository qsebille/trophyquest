package fr.trophyquest.backend.service;

import fr.trophyquest.backend.constants.GameMatchingStatus;
import fr.trophyquest.backend.domain.entity.igdb.OldIgdbGame;
import fr.trophyquest.backend.domain.entity.psn.PsnGame;
import fr.trophyquest.backend.domain.repository.igdb.IgdbCandidateRepository;
import fr.trophyquest.backend.domain.repository.igdb.IgdbGameRepository;
import fr.trophyquest.backend.domain.repository.psn.PsnGameRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Slf4j
@Service
public class IgdbCandidateService {
    private final PsnGameRepository psnGameRepository;
    private final IgdbGameRepository igdbGameRepository;
    private final IgdbCandidateRepository igdbCandidateRepository;

    public IgdbCandidateService(
            PsnGameRepository psnGameRepository,
            IgdbGameRepository igdbGameRepository,
            IgdbCandidateRepository igdbCandidateRepository
    ) {
        this.psnGameRepository = psnGameRepository;
        this.igdbGameRepository = igdbGameRepository;
        this.igdbCandidateRepository = igdbCandidateRepository;
    }

    @Transactional
    public Boolean validateCandidate(UUID gameId, long igdbGameId) {
        try {
            PsnGame game = this.psnGameRepository.getReferenceById(gameId);
            OldIgdbGame oldIgdbGame = this.igdbGameRepository.getReferenceById(igdbGameId);
            game.setOldIgdbGame(oldIgdbGame);
            game.setIgdbMatchStatus(GameMatchingStatus.MATCHED.getValue());
            this.psnGameRepository.save(game);
            this.igdbCandidateRepository.updateStatusAfterValidation(gameId, igdbGameId);
            return true;
        } catch (Exception e) {
            log.error("Failed to validate igdb for gameId {} and igdbGameId {}", gameId, igdbGameId, e);
            return false;
        }
    }

    @Transactional
    public Boolean rejectAllPendingCandidates(UUID gameId) {
        try {
            PsnGame game = this.psnGameRepository.getReferenceById(gameId);
            game.setIgdbMatchStatus(GameMatchingStatus.ALL_REFUSED.getValue());
            this.psnGameRepository.save(game);
            this.igdbCandidateRepository.updateStatusToRejected(gameId);
            return true;
        } catch (Exception e) {
            log.error("Failed to reject candidates for gameId {}", gameId, e);
            return false;
        }
    }

}
