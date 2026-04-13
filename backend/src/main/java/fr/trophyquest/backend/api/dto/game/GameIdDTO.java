package fr.trophyquest.backend.api.dto.game;

import lombok.Builder;

import java.util.UUID;

@Builder
public record GameIdDTO(UUID id) {
}
