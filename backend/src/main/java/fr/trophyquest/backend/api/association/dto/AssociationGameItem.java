package fr.trophyquest.backend.api.association.dto;

import lombok.Builder;

import java.util.Date;
import java.util.List;

@Builder
public record AssociationGameItem(
        long gameId,
        String title,
        String coverUrl,
        Date releaseDate,
        String gameType,
        String description,
        List<String> genres,
        List<String> themes,
        List<String> platforms,
        double score
) {
}
