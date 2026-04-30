package fr.trophyquest.backend.api.mapper;

import fr.trophyquest.backend.api.dto.player.PlayerDTO;
import fr.trophyquest.backend.api.dto.player.PlayerSearchItemDTO;
import fr.trophyquest.backend.domain.entity.psn.PsnPlayer;
import fr.trophyquest.backend.domain.entity.views.dim.Player;
import org.springframework.stereotype.Component;

@Component
public class PlayerMapper {

    public PlayerSearchItemDTO toPlayerSearchItemDTO(Player player) {
        return PlayerSearchItemDTO.builder()
                .id(player.getId())
                .pseudo(player.getPseudo())
                .avatar(player.getAvatarUrl())
                .nbPlayedGames(player.getNbPlayedGames())
                .nbEarnedPlatinum(player.getNbEarnedPlatinum())
                .nbEarnedGold(player.getNbEarnedGold())
                .nbEarnedSilver(player.getNbEarnedSilver())
                .nbEarnedBronze(player.getNbEarnedBronze())
                .build();
    }

    public PlayerDTO toDTO(PsnPlayer player) {
        return PlayerDTO.builder()
                .id(player.getId())
                .pseudo(player.getPseudo())
                .avatar(player.getAvatar())
                .build();
    }

}
