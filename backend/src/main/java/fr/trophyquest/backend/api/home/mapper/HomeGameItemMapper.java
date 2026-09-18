package fr.trophyquest.backend.api.home.mapper;

import fr.trophyquest.backend.api.home.dto.HomeGameItem;
import fr.trophyquest.backend.domain.projection.RecentGameProjection;
import org.springframework.stereotype.Component;

@Component
public class HomeGameItemMapper {

    public HomeGameItem fromRecentGameProjection(RecentGameProjection projection) {
        return HomeGameItem.builder()
                .gameId(projection.getGameId())
                .title(projection.getTitle())
                .coverUrl(projection.getCoverUrl())
                .nbRecentPlayers(projection.getNbRecentPlayers())
                .build();
    }

}
