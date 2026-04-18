package fr.trophyquest.backend.service;

import fr.trophyquest.backend.api.dto.game.GameIdDTO;
import fr.trophyquest.backend.api.dto.trophy.EarnedTrophyDTO;
import fr.trophyquest.backend.repository.GameRepository;
import fr.trophyquest.backend.repository.TrophyRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class TrophySuiteService {

    private final TrophyRepository trophyRepository;
    private final GameRepository gameRepository;

    public TrophySuiteService(
            TrophyRepository trophyRepository,
            GameRepository gameRepository
    ) {
        this.trophyRepository = trophyRepository;
        this.gameRepository = gameRepository;
    }

    public List<EarnedTrophyDTO> fetchEarnedTrophies(UUID trophySuiteId, Optional<UUID> playerId) {
        if (playerId.isEmpty()) {
            return this.trophyRepository.fetchTrophiesOfTrophySuite(trophySuiteId);
        } else {
            return this.trophyRepository.fetchPlayerTrophiesForTrophySuite(trophySuiteId, playerId.get());
        }
    }

    public GameIdDTO fetchGameId(UUID trophySuiteId) {
        UUID id = this.gameRepository.fetchGameIdByTrophySuiteId(trophySuiteId).orElseThrow();
        return GameIdDTO.builder().id(id).build();
    }
}
