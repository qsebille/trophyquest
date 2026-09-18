package fr.trophyquest.backend.api.dto.user;

import lombok.Builder;

import java.util.UUID;

@Builder
public record UserDTO(
        UUID id,
        String email,
        String displayName
) {
}
