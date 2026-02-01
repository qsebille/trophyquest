package fr.trophyquest.backend.api.dto.player;

import lombok.Builder;

@Builder
public record PlayerStatsDTO(
        long totalTrophySuitesPlayed,
        long totalPlatinumTrophies,
        long totalGoldTrophies,
        long totalSilverTrophies,
        long totalBronzeTrophies
) {
}
