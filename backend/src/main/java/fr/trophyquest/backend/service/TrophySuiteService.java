package fr.trophyquest.backend.service;

import fr.trophyquest.backend.api.dto.game.TrophySuiteGameDTO;
import fr.trophyquest.backend.api.dto.trophy.EarnedTrophyDTO;
import fr.trophyquest.backend.api.dto.trophysuite.TrophySuiteDTO;
import fr.trophyquest.backend.api.mapper.TrophySuiteMapper;
import fr.trophyquest.backend.domain.entity.TrophySuite;
import fr.trophyquest.backend.exceptions.TrophySuiteNotFoundException;
import fr.trophyquest.backend.repository.TrophyRepository;
import fr.trophyquest.backend.repository.TrophySuiteRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class TrophySuiteService {

    private final TrophySuiteRepository trophySuiteRepository;
    private final TrophyRepository trophyRepository;
    private final TrophySuiteMapper trophySuiteMapper;

    public TrophySuiteService(
            TrophySuiteRepository trophySuiteRepository,
            TrophyRepository trophyRepository,
            TrophySuiteMapper trophySuiteMapper
    ) {
        this.trophySuiteRepository = trophySuiteRepository;
        this.trophyRepository = trophyRepository;
        this.trophySuiteMapper = trophySuiteMapper;
    }

    public TrophySuiteDTO retrieve(UUID trophySuiteId) {
        TrophySuite trophySuite = this.trophySuiteRepository.findById(trophySuiteId)
                .orElseThrow(() -> new TrophySuiteNotFoundException(trophySuiteId));
        return this.trophySuiteMapper.toDTO(trophySuite);
    }


    public List<EarnedTrophyDTO> fetchEarnedTrophies(UUID trophySuiteId, Optional<UUID> playerId) {
        if (playerId.isEmpty()) {
            return this.trophyRepository.fetchTrophiesOfTrophySuite(trophySuiteId);
        } else {
            return this.trophyRepository.fetchPlayerTrophiesForTrophySuite(trophySuiteId, playerId.get());
        }
    }

    public TrophySuiteGameDTO fetchGameDetails(UUID trophySuiteId) {
        return null;
    }

}
