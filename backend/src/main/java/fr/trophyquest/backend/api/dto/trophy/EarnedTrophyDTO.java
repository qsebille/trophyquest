package fr.trophyquest.backend.api.dto.trophy;

import lombok.Builder;

import java.time.Instant;
import java.util.UUID;

@Builder
public record EarnedTrophyDTO(
        UUID id,
        int rank,
        String title,
        String description,
        String trophyType,
        Boolean isHidden,
        String icon,
        String trophyGroupId,
        String trophyGroupName,
        Instant earnedAt
) {
}
