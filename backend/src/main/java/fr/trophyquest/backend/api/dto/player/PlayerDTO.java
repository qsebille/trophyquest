package fr.trophyquest.backend.api.dto.player;

import lombok.Builder;

import java.util.UUID;

@Builder
public record PlayerDTO(
        UUID id,
        String pseudo,
        String avatar
) {
}
