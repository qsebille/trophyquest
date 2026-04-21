package fr.trophyquest.backend.api.dto.game;

import lombok.Builder;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Builder
public record GameSearchItemDTO(
        UUID id,
        String name,
        String coverUrl,
        String summary,
        List<String> genres,
        List<String> themes,
        List<String> platforms,
        String website,
        Date releaseDate,
        int nbPlayers,
        int nbTrophySuites
) {
}
