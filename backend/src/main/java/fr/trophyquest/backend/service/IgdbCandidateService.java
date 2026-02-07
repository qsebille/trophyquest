package fr.trophyquest.backend.service;

import fr.trophyquest.backend.api.dto.SearchDTO;
import fr.trophyquest.backend.api.dto.igdb.IgdbMappingDTO;
import fr.trophyquest.backend.api.mapper.IgdbCandidateMapper;
import fr.trophyquest.backend.constants.GameMatchingStatus;
import fr.trophyquest.backend.domain.entity.Game;
import fr.trophyquest.backend.domain.entity.igdb.IgdbGame;
import fr.trophyquest.backend.repository.GameRepository;
import fr.trophyquest.backend.repository.IgdbCandidateRepository;
import fr.trophyquest.backend.repository.IgdbGameRepository;
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
    private final GameRepository gameRepository;
    private final IgdbGameRepository igdbGameRepository;
    private final IgdbCandidateRepository igdbCandidateRepository;
    private final IgdbCandidateMapper candidateMapper;

    public IgdbCandidateService(
            GameRepository gameRepository,
            IgdbGameRepository igdbGameRepository,
            IgdbCandidateRepository igdbCandidateRepository,
            IgdbCandidateMapper candidateMapper
    ) {
        this.gameRepository = gameRepository;
        this.igdbGameRepository = igdbGameRepository;
        this.igdbCandidateRepository = igdbCandidateRepository;
        this.candidateMapper = candidateMapper;
    }

    /**
     * Searches and maps games requiring validation
     */
    public SearchDTO<IgdbMappingDTO> searchMappingToValidate(int pageNumber, int pageSize) {
        PageRequest pageRequest = PageRequest.of(pageNumber, pageSize);
        Page<UUID> gameUuids = this.gameRepository.findGamesWithValidationRequired(pageRequest);
        List<Game> games = this.gameRepository.fetchGamesWithCandidatesByIds(gameUuids.getContent());

        List<IgdbMappingDTO> gamesWithCandidates = games.stream()
                .map(this.candidateMapper::toMappingDTO)
                .toList();
        long total = gameUuids.getTotalElements();

        return SearchDTO.<IgdbMappingDTO>builder().content(gamesWithCandidates).total(total).build();
    }

    @Transactional
    public Boolean validateCandidate(UUID gameId, long igdbGameId) {
        try {
            Game game = this.gameRepository.getReferenceById(gameId);
            IgdbGame igdbGame = this.igdbGameRepository.getReferenceById(igdbGameId);
            game.setIgdbGame(igdbGame);
            game.setIgdbMatchStatus(GameMatchingStatus.MATCHED.getValue());
            this.gameRepository.save(game);
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
            Game game = this.gameRepository.getReferenceById(gameId);
            game.setIgdbMatchStatus(GameMatchingStatus.ALL_REFUSED.getValue());
            this.gameRepository.save(game);
            this.igdbCandidateRepository.updateStatusToRejected(gameId);
            return true;
        } catch (Exception e) {
            log.error("Failed to reject candidates for gameId {}", gameId, e);
            return false;
        }
    }

}
