package fr.trophyquest.backend.api.profile.mapper;

import fr.trophyquest.backend.api.profile.dto.ProfileSuiteItem;
import fr.trophyquest.backend.domain.entity.PlayedSuite;
import org.springframework.stereotype.Component;

@Component
public class ProfileSuiteItemMapper {

    public ProfileSuiteItem fromPlayedSuite(PlayedSuite playedSuite) {
        int suiteBronzeTrophies = playedSuite.getSuite().getNbBronzeTrophies();
        int suiteSilverTrophies = playedSuite.getSuite().getNbSilverTrophies();
        int suiteGoldTrophies = playedSuite.getSuite().getNbGoldTrophies();
        int suitePlatinumTrophies = playedSuite.getSuite().getNbPlatinumTrophies();
        int suiteTrophies = suiteBronzeTrophies + suiteSilverTrophies + suiteGoldTrophies + suitePlatinumTrophies;

        return ProfileSuiteItem.builder()
                .suiteId(playedSuite.getSuite().getId())
                .title(playedSuite.getSuite().getName())
                .platforms(playedSuite.getSuite().getPlatforms())
                .imageUrl(playedSuite.getSuite().getImageUrl())
                .nbTrophies(suiteTrophies)
                .nbEarnedBronzeTrophies(playedSuite.getNbEarnedBronze())
                .nbEarnedSilverTrophies(playedSuite.getNbEarnedSilver())
                .nbEarnedGoldTrophies(playedSuite.getNbEarnedGold())
                .nbEarnedPlatinumTrophies(playedSuite.getNbEarnedPlatinum())
                .build();
    }

}
