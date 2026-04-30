package fr.trophyquest.backend.api.dto.trophy;

import lombok.Builder;

import java.util.Date;
import java.util.UUID;

@Builder
public record PlayerTrophyDTO(
        UUID id,
        String title,
        String trophyType,
        String icon,
        String description,
        UUID trophySuiteId,
        String trophySuiteTitle,
        Date earnedAt
) {
}
