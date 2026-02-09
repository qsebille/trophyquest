package fr.trophyquest.backend.api.dto.game;

import lombok.Builder;

import java.util.List;
import java.util.UUID;

@Builder
public record TrophySuiteGameDTO(
        UUID id,
        String name,
        List<GameImageDTO> images
) {
}
