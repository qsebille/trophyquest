package fr.trophyquest.backend.api.dto.game;

import lombok.Builder;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Builder
public record GameDetailsDTO(
        UUID id,
        String name,
        String description,
        List<String> genres,
        List<String> themes,
        Date releaseDate,
        List<GameImageDTO> images
) {
}
