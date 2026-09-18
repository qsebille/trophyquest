package fr.trophyquest.backend.api.home;

import fr.trophyquest.backend.api.home.dto.HomeGameItem;
import fr.trophyquest.backend.api.home.dto.HomePlayerItem;
import fr.trophyquest.backend.api.home.mapper.HomeGameItemMapper;
import fr.trophyquest.backend.api.home.mapper.HomePlayerItemMapper;
import fr.trophyquest.backend.domain.projection.RecentGameProjection;
import fr.trophyquest.backend.domain.projection.RecentPlayerProjection;
import fr.trophyquest.backend.domain.repository.EarnedTrophyRepository;
import fr.trophyquest.backend.domain.repository.PlayedGameRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class HomeService {

    private final PlayedGameRepository playedGameRepository;
    private final EarnedTrophyRepository earnedTrophyRepository;
    private final HomeGameItemMapper homeGameItemMapper;
    private final HomePlayerItemMapper homePlayerItemMapper;

    public HomeService(PlayedGameRepository playedGameRepository,
                       EarnedTrophyRepository earnedTrophyRepository,
                       HomeGameItemMapper homeGameItemMapper,
                       HomePlayerItemMapper homePlayerItemMapper) {
        this.playedGameRepository = playedGameRepository;
        this.earnedTrophyRepository = earnedTrophyRepository;
        this.homeGameItemMapper = homeGameItemMapper;
        this.homePlayerItemMapper = homePlayerItemMapper;
    }

    private Instant recentLimit() {
        return Instant.now().minus(7, ChronoUnit.DAYS);
    }

    /**
     * Fetch the top games with the most recent players.
     *
     * @param size The number of games to fetch
     * @return A list of games
     */
    public List<HomeGameItem> fetchTopGames(int size) {
        List<RecentGameProjection> topGames = playedGameRepository.searchTopRecent(recentLimit(), size);
        return topGames.stream()
                .map(homeGameItemMapper::fromRecentGameProjection)
                .toList();
    }


    /**
     * Fetch the top players with the most recent earned trophies.
     *
     * @param size The number of players to fetch
     * @return A list of players
     */
    public List<HomePlayerItem> fetchTopPlayers(int size) {
        List<RecentPlayerProjection> topPlayers = earnedTrophyRepository.searchTopRecent(recentLimit(), size);
        return topPlayers.stream()
                .map(homePlayerItemMapper::fromRecentPlayerProjection)
                .toList();
    }

}
