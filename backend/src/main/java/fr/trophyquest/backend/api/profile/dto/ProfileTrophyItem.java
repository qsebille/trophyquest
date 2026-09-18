package fr.trophyquest.backend.api.profile.dto;

import lombok.Builder;

import java.time.Instant;
import java.util.UUID;

@Builder
public record ProfileTrophyItem(
        UUID trophyId,
        UUID suiteId,
        String title,
        String suiteName,
        String description,
        String color,
        String iconUrl,
        Instant earnedAt
) {
}
