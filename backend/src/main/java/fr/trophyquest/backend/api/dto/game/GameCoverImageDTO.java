package fr.trophyquest.backend.api.dto.game;

import java.util.UUID;

public record GameCoverImageDTO(
        UUID id,
        String url
) {
}
