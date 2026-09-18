package fr.trophyquest.backend.api.profile.dto;

import lombok.Builder;

import java.util.List;
import java.util.UUID;

@Builder
public record ProfileSuiteItem(
        UUID suiteId,
        String title,
        List<String> platforms,
        String imageUrl,
        int nbTrophies,
        int nbEarnedBronzeTrophies,
        int nbEarnedSilverTrophies,
        int nbEarnedGoldTrophies,
        int nbEarnedPlatinumTrophies
) {
}
