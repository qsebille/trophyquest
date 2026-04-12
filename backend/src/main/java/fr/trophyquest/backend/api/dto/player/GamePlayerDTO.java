package fr.trophyquest.backend.api.dto.player;

import java.time.Instant;
import java.util.UUID;

public record GamePlayerDTO(
        UUID id,
        String pseudo,
        String avatar,
        Instant lastPlayedAt
) {
}
