package fr.trophyquest.backend.api.game.details.mappers;

import fr.trophyquest.backend.api.game.details.dto.GameSuiteItem;
import fr.trophyquest.backend.domain.entity.Suite;
import org.springframework.stereotype.Component;

@Component
public class GameSuiteItemMapper {
    public GameSuiteItemMapper() {
    }

    public GameSuiteItem fromSuite(Suite suite) {
        return GameSuiteItem.builder()
                .suiteId(suite.getId())
                .title(suite.getName())
                .platforms(suite.getPlatforms())
                .imageUrl(suite.getImageUrl())
                .nbBronzeTrophies(suite.getNbBronzeTrophies())
                .nbSilverTrophies(suite.getNbSilverTrophies())
                .nbGoldTrophies(suite.getNbGoldTrophies())
                .nbPlatinumTrophies(suite.getNbPlatinumTrophies())
                .build();
    }

}
