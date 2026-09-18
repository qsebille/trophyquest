package fr.trophyquest.backend.api.game.details.dto;

import lombok.Builder;

import java.time.Instant;
import java.util.UUID;

@Builder
public record GameTrophyItem(
        UUID trophyId,
        int rank,
        String title,
        String description,
        String color,
        String iconUrl,
        boolean isHidden,
        String groupName,
        Instant earnedAt
) {
}
