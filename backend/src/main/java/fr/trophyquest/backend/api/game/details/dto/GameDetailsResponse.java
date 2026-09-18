package fr.trophyquest.backend.api.game.details.dto;

import lombok.Builder;

import java.util.Date;
import java.util.List;

@Builder
public record GameDetailsResponse(
        long gameId,
        String title,
        String summary,
        List<String> genres,
        List<String> themes,
        Date releaseDate,
        String coverUrl,
        List<String> screenshotUrls
) {
}
