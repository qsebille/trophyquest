package fr.trophyquest.backend.api.dto.stats;

import lombok.Builder;

@Builder
public record ImageUploadStats(
        long uploaded,
        long pending
) {
}
