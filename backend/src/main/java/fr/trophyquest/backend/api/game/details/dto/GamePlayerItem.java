package fr.trophyquest.backend.api.game.details.dto;

import lombok.Builder;

import java.time.Instant;
import java.util.UUID;

@Builder
public record GamePlayerItem(
        UUID playerId,
        String pseudo,
        String avatarUrl,
        Instant lastPlayedAt
) {
}
