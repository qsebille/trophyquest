package fr.trophyquest.backend.api.dto.trophy;

import lombok.Builder;

import java.time.Instant;
import java.util.UUID;

@Builder
public record EarnedTrophySearchItemDTO(
        UUID id,
        String title,
        String trophyType,
        String icon,
        String description,
        UUID trophySuiteId,
        String trophySuiteTitle,
        Instant earnedAt
) {
}
