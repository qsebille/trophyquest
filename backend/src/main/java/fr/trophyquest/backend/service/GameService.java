package fr.trophyquest.backend.service;

import fr.trophyquest.backend.repository.GameRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

@Service
public class GameService {

    private final GameRepository gameRepository;

    public GameService(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }


    public long count() {
        return this.gameRepository.count();
    }

    public long countRecentlyPlayed() {
        Instant limitDate = Instant.now().minus(7, ChronoUnit.DAYS);
        return this.gameRepository.countRecentlyPlayed(limitDate);
    }

}
