package fr.trophyquest.backend.service;

import fr.trophyquest.backend.repository.psn.PsnEarnedTrophyRepository;
import fr.trophyquest.backend.repository.psn.PsnTrophyRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

@Service
public class TrophyService {

    private final PsnTrophyRepository trophyRepository;
    private final PsnEarnedTrophyRepository earnedTrophyRepository;

    public TrophyService(PsnTrophyRepository trophyRepository, PsnEarnedTrophyRepository earnedTrophyRepository) {
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
