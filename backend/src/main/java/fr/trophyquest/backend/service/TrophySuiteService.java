package fr.trophyquest.backend.service;

import fr.trophyquest.backend.api.dto.game.GameIdDTO;
import fr.trophyquest.backend.api.dto.trophy.EarnedTrophyDTO;
import fr.trophyquest.backend.repository.psn.PsnGameRepository;
import fr.trophyquest.backend.repository.psn.PsnTrophyRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class TrophySuiteService {

    private final PsnTrophyRepository trophyRepository;
    private final PsnGameRepository psnGameRepository;

    public TrophySuiteService(
            PsnTrophyRepository trophyRepository,
            PsnGameRepository psnGameRepository
    ) {
        this.trophyRepository = trophyRepository;
        this.psnGameRepository = psnGameRepository;
    }

    public List<EarnedTrophyDTO> fetchEarnedTrophies(UUID trophySuiteId, Optional<UUID> playerId) {
        if (playerId.isEmpty()) {
            return this.trophyRepository.fetchTrophiesOfTrophySuite(trophySuiteId);
        } else {
            return this.trophyRepository.fetchPlayerTrophiesForTrophySuite(trophySuiteId, playerId.get());
        }
    }

    public GameIdDTO fetchGameId(UUID trophySuiteId) {
        UUID id = this.psnGameRepository.fetchGameIdByTrophySuiteId(trophySuiteId).orElseThrow();
        return GameIdDTO.builder().id(id).build();
    }
}
