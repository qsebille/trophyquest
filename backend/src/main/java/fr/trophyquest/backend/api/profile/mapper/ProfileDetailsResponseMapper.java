package fr.trophyquest.backend.api.profile.mapper;

import fr.trophyquest.backend.api.profile.dto.ProfileDetailsResponse;
import fr.trophyquest.backend.domain.entity.Player;
import org.springframework.stereotype.Component;

@Component
public class ProfileDetailsResponseMapper {

    public ProfileDetailsResponse fromPlayer(Player player) {
        return ProfileDetailsResponse.builder()
                .playerId(player.getId())
                .pseudo(player.getPseudo())
                .avatarUrl(player.getAvatarUrl())
                .nbPlayedGames(player.getNbPlayedSuites())
                .nbEarnedBronzeTrophies(player.getNbEarnedBronze())
                .nbEarnedSilverTrophies(player.getNbEarnedSilver())
                .nbEarnedGoldTrophies(player.getNbEarnedGold())
                .nbEarnedPlatinumTrophies(player.getNbEarnedPlatinum())
                .build();
    }

}
