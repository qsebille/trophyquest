package fr.trophyquest.backend.api.mapper;

import fr.trophyquest.backend.api.dto.player.PlayedGameDTO;
import fr.trophyquest.backend.domain.entity.psn.PsnPlayedGame;
import org.springframework.stereotype.Component;

@Component
public class PlayedGameMapper {

    public PlayedGameDTO toDTO(PsnPlayedGame playedGame) {
        return PlayedGameDTO.builder()
                .id(playedGame.getPlayer().getId())
                .pseudo(playedGame.getPlayer().getPseudo())
                .avatar(playedGame.getPlayer().getAvatar())
                .lastPlayedAt(playedGame.getLastPlayedAt())
                .build();
    }

}
