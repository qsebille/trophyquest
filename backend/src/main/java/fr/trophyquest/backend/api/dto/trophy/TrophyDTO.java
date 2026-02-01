package fr.trophyquest.backend.api.dto.trophy;

import lombok.Builder;

import java.util.UUID;

@Builder
public record TrophyDTO(
        UUID id,
        int rank,
        String title,
        String description,
        String trophyType,
        Boolean isHidden,
        String icon,
        String gameGroupId
) {
}
