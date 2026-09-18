package fr.trophyquest.backend.api.game.details.dto;

import lombok.Builder;

import java.util.List;
import java.util.UUID;

@Builder
public record GameSuiteItem(
        UUID suiteId,
        String title,
        List<String> platforms,
        String imageUrl,
        int nbBronzeTrophies,
        int nbSilverTrophies,
        int nbGoldTrophies,
        int nbPlatinumTrophies
) {
}
