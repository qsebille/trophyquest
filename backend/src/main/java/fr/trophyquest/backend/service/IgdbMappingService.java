package fr.trophyquest.backend.service;

import fr.trophyquest.backend.api.dto.igdb.IgdbMappingStatsDTO;
import fr.trophyquest.backend.repository.GameRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class IgdbMappingService {
    private final GameRepository gameRepository;

    public IgdbMappingService(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }


    public IgdbMappingStatsDTO getStats() {
        return this.gameRepository.fetchIgdbMappingStats();
    }

}
