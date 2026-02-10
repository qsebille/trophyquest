package fr.trophyquest.backend.api.dto.igdb;

import lombok.Builder;

@Builder
public record IgdbMappingStatsDTO(
        long pending,
        long validationRequired,
        long noFoundCandidate,
        long allRefused,
        long matched
) {
}
