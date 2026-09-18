package fr.trophyquest.backend.api.profile.dto;

import lombok.Builder;

import java.util.UUID;

@Builder
public record ProfileDetailsResponse(
        UUID playerId,
        String pseudo,
        String avatarUrl,
        int nbPlayedGames,
        int nbEarnedBronzeTrophies,
        int nbEarnedSilverTrophies,
        int nbEarnedGoldTrophies,
        int nbEarnedPlatinumTrophies
) {
}
