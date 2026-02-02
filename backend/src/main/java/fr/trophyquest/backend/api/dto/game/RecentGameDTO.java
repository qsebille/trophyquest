package fr.trophyquest.backend.api.dto.game;

import lombok.Builder;

import java.util.UUID;

@Builder
public record RecentGameDTO(
        UUID id,
        String name,
        String imageUrl,
        Integer nbPlayers
) {
}
