package fr.trophyquest.backend.api.mapper;

import fr.trophyquest.backend.api.dto.auth.user.AuthUserDTO;
import fr.trophyquest.backend.domain.entity.AuthUser;
import org.springframework.stereotype.Component;

@Component
public class AuthUserMapper {

    public AuthUserMapper() {
    }

    public AuthUserDTO toDTO(AuthUser entity) {
        return AuthUserDTO.builder()
                .id(entity.getId())
                .email(entity.getEmail())
                .displayName(entity.getDisplayName())
                .build();
    }
}
