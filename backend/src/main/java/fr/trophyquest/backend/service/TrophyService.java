package fr.trophyquest.backend.service;

import fr.trophyquest.backend.repository.EarnedTrophyRepository;
import fr.trophyquest.backend.repository.TrophyRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

@Service
public class TrophyService {

    private final TrophyRepository trophyRepository;
    private final EarnedTrophyRepository earnedTrophyRepository;

    public TrophyService(TrophyRepository trophyRepository, EarnedTrophyRepository earnedTrophyRepository) {
        this.trophyRepository = trophyRepository;
        this.earnedTrophyRepository = earnedTrophyRepository;
    }

    public long count() {
        return this.trophyRepository.count();
    }

    public long countRecentlyEarned() {
        Instant limitDate = Instant.now().minus(7, ChronoUnit.DAYS);
        return this.earnedTrophyRepository.countRecent(limitDate);
    }

}
