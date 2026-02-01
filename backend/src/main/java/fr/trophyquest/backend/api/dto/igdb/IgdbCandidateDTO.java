package fr.trophyquest.backend.api.dto.igdb;

import lombok.Builder;

import java.util.Date;

@Builder
public record IgdbCandidateDTO(
        Long id,
        String name,
        String gameType,
        String website,
        String cover,
        Date releaseDate,
        Long score
) {
}
