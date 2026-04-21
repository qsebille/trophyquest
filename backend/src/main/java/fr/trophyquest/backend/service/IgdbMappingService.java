package fr.trophyquest.backend.service;

import fr.trophyquest.backend.api.dto.igdb.IgdbMappingStatsDTO;
import fr.trophyquest.backend.repository.PsnGameRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class IgdbMappingService {
    private final PsnGameRepository psnGameRepository;

    public IgdbMappingService(PsnGameRepository psnGameRepository) {
        this.psnGameRepository = psnGameRepository;
    }


    public IgdbMappingStatsDTO getStats() {
        return this.psnGameRepository.fetchIgdbMappingStats();
    }

}
