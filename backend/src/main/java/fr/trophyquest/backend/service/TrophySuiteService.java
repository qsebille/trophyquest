package fr.trophyquest.backend.service;

import fr.trophyquest.backend.api.dto.trophy.TrophyDTO;
import fr.trophyquest.backend.api.dto.trophysuite.TrophySuiteDTO;
import fr.trophyquest.backend.api.mapper.TrophyMapper;
import fr.trophyquest.backend.api.mapper.TrophySuiteMapper;
import fr.trophyquest.backend.domain.entity.views.dim.Trophy;
import fr.trophyquest.backend.domain.entity.views.fact.EarnedTrophy;
import fr.trophyquest.backend.domain.repository.views.dim.TrophyRepository;
import fr.trophyquest.backend.domain.repository.views.dim.TrophySuiteRepository;
import fr.trophyquest.backend.domain.repository.views.fact.EarnedTrophyRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class TrophySuiteService {
    private final TrophyRepository trophyRepository;
    private final TrophySuiteRepository trophySuiteRepository;
    private final EarnedTrophyRepository earnedTrophyRepository;
    private final TrophyMapper trophyMapper;
    private final TrophySuiteMapper trophySuiteMapper;


    public TrophySuiteService(
            TrophyRepository trophyRepository,
            TrophySuiteRepository trophySuiteRepository,
            EarnedTrophyRepository earnedTrophyRepository,
            TrophyMapper trophyMapper,
            TrophySuiteMapper trophySuiteMapper
    ) {
        this.trophyRepository = trophyRepository;
        this.trophySuiteRepository = trophySuiteRepository;
        this.earnedTrophyRepository = earnedTrophyRepository;
        this.trophyMapper = trophyMapper;
        this.trophySuiteMapper = trophySuiteMapper;
    }

    public List<TrophyDTO> fetchEarnedTrophies(UUID trophySuiteId, Optional<UUID> playerId) {
        List<Trophy> trophies = this.trophyRepository.findAllByTrophySuiteId(trophySuiteId);
        List<EarnedTrophy> earnedTrophies = this.earnedTrophyRepository.findAllByPlayerIdAndTrophySuiteId(playerId.orElse(null), trophySuiteId);

        return trophies.stream()
                .map(trophy -> trophyMapper.toDTO(trophy, earnedTrophies))
                .toList();
    }

    public List<TrophySuiteDTO> findForGame(UUID gameId) {
        return this.trophySuiteRepository.findAllByGameId(gameId)
                .stream()
                .map(this.trophySuiteMapper::toDTO)
                .toList();
    }
}
