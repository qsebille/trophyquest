package fr.trophyquest.backend.api.dto.game;

import lombok.Builder;

import java.util.Date;
import java.util.List;

@Builder
public record GameDetailsDTO(
        long id,
        String name,
        String description,
        List<String> genres,
        List<String> themes,
        Date releaseDate,
        String coverUrl,
        List<String> screenshotsUrl
) {
}
