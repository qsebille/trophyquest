package fr.trophyquest.backend.api.dto.game;

import lombok.Builder;

@Builder
public record GameImageDTO(
        String imageUrl,
        String imageType,
        String source
) {
}
