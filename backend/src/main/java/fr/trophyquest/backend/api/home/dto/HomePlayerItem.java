package fr.trophyquest.backend.api.home.dto;

import lombok.Builder;

import java.util.UUID;

@Builder
public record HomePlayerItem(
        UUID playerId,
        String pseudo,
        String avatarUrl,
        int nbRecentBronzeTrophies,
        int nbRecentSilverTrophies,
        int nbRecentGoldTrophies,
        int nbRecentPlatinumTrophies
) {
}
