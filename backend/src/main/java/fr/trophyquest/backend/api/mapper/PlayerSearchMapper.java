package fr.trophyquest.backend.api.mapper;

import fr.trophyquest.backend.api.dto.player.PlayerSearchItemDTO;
import fr.trophyquest.backend.domain.entity.views.PlayerSearchItem;
import org.springframework.stereotype.Component;

@Component
public class PlayerSearchMapper {

    public PlayerSearchItemDTO toDTO(PlayerSearchItem player) {
        return PlayerSearchItemDTO.builder()
                .id(player.getId())
                .pseudo(player.getPseudo())
                .avatar(player.getAvatar())
                .totalPlayedGames(player.getTotalPlayedGames())
                .totalEarnedPlatinum(player.getTotalEarnedPlatinum())
                .totalEarnedGold(player.getTotalEarnedGold())
                .totalEarnedSilver(player.getTotalEarnedSilver())
                .totalEarnedBronze(player.getTotalEarnedBronze())
                .build();
    }

}
