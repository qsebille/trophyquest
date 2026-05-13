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
                .nbPlayedGames(player.getNbPlayedGames() != null ? player.getNbPlayedGames() : 0)
                .nbEarnedPlatinum(player.getNbEarnedPlatinum() != null ? player.getNbEarnedPlatinum() : 0)
                .nbEarnedGold(player.getNbEarnedGold() != null ? player.getNbEarnedGold() : 0)
                .nbEarnedSilver(player.getNbEarnedSilver() != null ? player.getNbEarnedSilver() : 0)
                .nbEarnedBronze(player.getNbEarnedBronze() != null ? player.getNbEarnedBronze() : 0)
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
