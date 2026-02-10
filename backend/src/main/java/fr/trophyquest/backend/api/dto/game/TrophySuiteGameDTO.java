package fr.trophyquest.backend.api.dto.game;

import lombok.Builder;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Builder
public record TrophySuiteGameDTO(
        UUID id,
        String name,
        String summary,
        List<String> genres,
        Date releaseDate,
        List<GameImageDTO> images
) {
}
