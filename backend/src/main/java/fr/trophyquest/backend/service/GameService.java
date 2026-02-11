package fr.trophyquest.backend.service;

import fr.trophyquest.backend.api.dto.game.GameCoverImageDTO;
import fr.trophyquest.backend.repository.GameImageRepository;
import fr.trophyquest.backend.repository.GameRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

@Service
public class GameService {

    private final GameRepository gameRepository;
    private final GameImageRepository gameImageRepository;

    public GameService(GameRepository gameRepository, GameImageRepository gameImageRepository) {
        this.gameRepository = gameRepository;
        this.gameImageRepository = gameImageRepository;
    }


    public long count() {
        return this.gameRepository.count();
    }

    public long countRecentlyPlayed() {
        Instant limitDate = Instant.now().minus(7, ChronoUnit.DAYS);
        return this.gameRepository.countRecentlyPlayed(limitDate);
    }

    public GameCoverImageDTO fetchRandomCoverImageUrl() {
        return this.gameImageRepository.fetchRandomCoverImage();
    }

}
