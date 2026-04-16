package fr.trophyquest.backend.api.dto.auth.user;

import lombok.Builder;

import java.util.UUID;

@Builder
public record AuthUserDTO(
        UUID id,
        String email,
        String displayName
) {
}
