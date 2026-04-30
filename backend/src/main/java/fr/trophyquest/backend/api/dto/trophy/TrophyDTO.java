package fr.trophyquest.backend.api.dto.trophy;

import lombok.Builder;

import java.util.Date;
import java.util.UUID;

@Builder
public record TrophyDTO(
        UUID id,
        int rank,
        String title,
        String description,
        String trophyType,
        Boolean isHidden,
        String iconUrl,
        String groupType,
        String groupName,
        Date earnedAt
) {
}
