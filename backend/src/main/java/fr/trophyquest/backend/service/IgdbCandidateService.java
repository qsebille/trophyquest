package fr.trophyquest.backend.service;

import fr.trophyquest.backend.api.dto.PaginationDTO;
import fr.trophyquest.backend.api.dto.igdb.IgdbMappingDTO;
import fr.trophyquest.backend.api.mapper.IgdbCandidateMapper;
import fr.trophyquest.backend.constants.GameMatchingStatus;
import fr.trophyquest.backend.domain.entity.PsnGame;
import fr.trophyquest.backend.domain.entity.igdb.IgdbGame;
import fr.trophyquest.backend.repository.IgdbCandidateRepository;
import fr.trophyquest.backend.repository.IgdbGameRepository;
import fr.trophyquest.backend.repository.PsnGameRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Slf4j
@Service
public class IgdbCandidateService {
    private final PsnGameRepository psnGameRepository;
    private final IgdbGameRepository igdbGameRepository;
    private final IgdbCandidateRepository igdbCandidateRepository;
    private final IgdbCandidateMapper candidateMapper;

    public IgdbCandidateService(
            PsnGameRepository psnGameRepository,
            IgdbGameRepository igdbGameRepository,
            IgdbCandidateRepository igdbCandidateRepository,
            IgdbCandidateMapper candidateMapper
    ) {
        this.psnGameRepository = psnGameRepository;
        this.igdbGameRepository = igdbGameRepository;
        this.igdbCandidateRepository = igdbCandidateRepository;
        this.candidateMapper = candidateMapper;
    }

    /**
     * Searches and maps games requiring validation
     */
    public PaginationDTO<IgdbMappingDTO> searchMappingToValidate(int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size);
        Page<UUID> gameUuids = this.psnGameRepository.findGamesWithValidationRequired(pageRequest);
        List<PsnGame> games = this.psnGameRepository.fetchGamesWithCandidatesByIds(gameUuids.getContent());

        List<IgdbMappingDTO> gamesWithCandidates = games.stream()
                .map(this.candidateMapper::toMappingDTO)
                .toList();

        return PaginationDTO.<IgdbMappingDTO>builder()
                .content(gamesWithCandidates)
                .total(gameUuids.getTotalElements())
                .page(page)
                .size(size)
                .build();
    }

    @Transactional
    public Boolean validateCandidate(UUID gameId, long igdbGameId) {
        try {
            PsnGame game = this.psnGameRepository.getReferenceById(gameId);
            IgdbGame igdbGame = this.igdbGameRepository.getReferenceById(igdbGameId);
            game.setIgdbGame(igdbGame);
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
