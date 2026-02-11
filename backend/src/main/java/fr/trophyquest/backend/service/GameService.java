package fr.trophyquest.backend.service;

import fr.trophyquest.backend.repository.GameRepository;
import fr.trophyquest.backend.repository.RecentGameSearchItemRepository;
import org.springframework.stereotype.Service;

@Service
public class GameService {

    private final GameRepository gameRepository;
    private final RecentGameSearchItemRepository recentGameSearchItemRepository;

    public GameService(
            GameRepository gameRepository,
            RecentGameSearchItemRepository recentGameSearchItemRepository
    ) {
        this.gameRepository = gameRepository;
        this.recentGameSearchItemRepository = recentGameSearchItemRepository;
    }

    public long count() {
        return this.gameRepository.count();
    }

    public long countRecentlyPlayed() {
        return this.recentGameSearchItemRepository.count();
    }

}
