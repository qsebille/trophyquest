package fr.trophyquest.backend.api.home.mapper;

import fr.trophyquest.backend.api.home.dto.HomePlayerItem;
import fr.trophyquest.backend.domain.projection.RecentPlayerProjection;
import org.springframework.stereotype.Component;

@Component
public class HomePlayerItemMapper {

    public HomePlayerItem fromRecentPlayerProjection(RecentPlayerProjection projection) {
        return HomePlayerItem.builder()
                .playerId(projection.getPlayerId())
                .pseudo(projection.getPseudo())
                .avatarUrl(projection.getAvatarUrl())
                .nbRecentBronzeTrophies(projection.getNbRecentBronzeTrophies())
                .nbRecentSilverTrophies(projection.getNbRecentSilverTrophies())
                .nbRecentGoldTrophies(projection.getNbRecentGoldTrophies())
                .nbRecentPlatinumTrophies(projection.getNbRecentPlatinumTrophies())
                .build();
    }

}
