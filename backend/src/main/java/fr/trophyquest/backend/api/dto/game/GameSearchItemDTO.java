package fr.trophyquest.backend.api.dto.game;

import lombok.Builder;

import java.util.Date;
import java.util.List;

@Builder
public record GameSearchItemDTO(
        long id,
        String name,
        String coverUrl,
        String summary,
        List<String> genres,
        List<String> themes,
        List<String> platforms,
        String officialWebsite,
        String wikiaWebsite,
        Date releaseDate,
        int nbPlayers,
        int nbTrophySuites
) {
}
