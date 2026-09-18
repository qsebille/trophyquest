package fr.trophyquest.backend.api.mapper;

import fr.trophyquest.backend.api.dto.user.UserDTO;
import fr.trophyquest.backend.domain.entity.User;
import org.springframework.stereotype.Component;

@Component
public class AuthUserMapper {

    public AuthUserMapper() {
    }

    public UserDTO toDTO(User entity) {
        return UserDTO.builder()
                .id(entity.getId())
                .email(entity.getEmail())
                .displayName(entity.getDisplayName())
                .build();
    }
}
