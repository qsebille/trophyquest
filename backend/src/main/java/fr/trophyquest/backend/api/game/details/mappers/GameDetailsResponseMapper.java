package fr.trophyquest.backend.api.game.details.mappers;

import fr.trophyquest.backend.api.game.details.dto.GameDetailsResponse;
import fr.trophyquest.backend.domain.entity.Game;
import fr.trophyquest.backend.domain.entity.Suite;
import org.springframework.stereotype.Component;

import java.util.Collections;

@Component
public class GameDetailsResponseMapper {
    public GameDetailsResponseMapper() {
    }

    public GameDetailsResponse fromGame(Game game) {
        return GameDetailsResponse.builder()
                .gameId(game.getId())
                .title(game.getName())
                .summary(game.getSummary())
                .genres(game.getGenres())
                .themes(game.getThemes())
                .releaseDate(game.getReleaseDate())
                .coverUrl(game.getCoverUrl())
                .screenshotUrls(game.getScreenshotsUrl())
                .build();
    }

    public GameDetailsResponse fromSuite(Suite suite) {
        return GameDetailsResponse.builder()
                .gameId(suite.getGameId())
                .title(suite.getName())
                .summary(null)
                .genres(Collections.emptyList())
                .themes(Collections.emptyList())
                .releaseDate(null)
                .coverUrl(suite.getImageUrl())
                .screenshotUrls(Collections.emptyList())
                .build();
    }
}
