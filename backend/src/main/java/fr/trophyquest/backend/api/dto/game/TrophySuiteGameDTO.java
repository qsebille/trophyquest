package fr.trophyquest.backend.api.dto.game;

import lombok.Builder;

import java.util.UUID;

@Builder
public record TrophySuiteGameDTO(
        UUID id,
        String name
) {
}
