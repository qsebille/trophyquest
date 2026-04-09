package fr.trophyquest.backend.api.dto.trophysuite;

import lombok.Builder;

import java.util.List;
import java.util.UUID;

@Builder
public record TrophySuiteWithCountsDTO(
        UUID id,
        String title,
        List<String> platforms,
        String image,
        long totalPlatinumTrophies,
        long totalGoldTrophies,
        long totalSilverTrophies,
        long totalBronzeTrophies
) {
}
