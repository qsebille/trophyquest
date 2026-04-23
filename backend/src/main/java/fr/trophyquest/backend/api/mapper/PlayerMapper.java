package fr.trophyquest.backend.api.mapper;

import fr.trophyquest.backend.api.dto.player.PlayerDTO;
import fr.trophyquest.backend.domain.entity.psn.PsnPlayer;
import org.springframework.stereotype.Component;

@Component
public class PlayerMapper {

    public PlayerDTO toDTO(PsnPlayer player) {
        return PlayerDTO.builder()
                .id(player.getId())
                .pseudo(player.getPseudo())
                .avatar(player.getAvatar())
                .build();
    }

}
