package fr.trophyquest.backend.api.dto.player;

import lombok.Builder;

import java.time.Instant;
import java.util.UUID;

@Builder
public record PlayedGameDTO(
        UUID id,
        String pseudo,
        String avatar,
        Instant lastPlayedAt
) {
}
