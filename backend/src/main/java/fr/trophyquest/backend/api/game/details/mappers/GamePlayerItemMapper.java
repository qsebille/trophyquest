package fr.trophyquest.backend.api.game.details.mappers;

import fr.trophyquest.backend.api.game.details.dto.GamePlayerItem;
import fr.trophyquest.backend.domain.entity.PlayedGame;
import fr.trophyquest.backend.domain.entity.PlayedSuite;
import org.springframework.stereotype.Component;

@Component
public class GamePlayerItemMapper {
    public GamePlayerItemMapper() {
    }

    public GamePlayerItem fromPlayedGame(PlayedGame playedGame) {
        return GamePlayerItem.builder()
                .playerId(playedGame.getPlayer().getId())
                .pseudo(playedGame.getPlayer().getPseudo())
                .avatarUrl(playedGame.getPlayer().getAvatarUrl())
                .lastPlayedAt(playedGame.getLastPlayedAt())
                .build();
    }

    public GamePlayerItem fromPlayedSuite(PlayedSuite playedSuite) {
        return GamePlayerItem.builder()
                .playerId(playedSuite.getPlayer().getId())
                .pseudo(playedSuite.getPlayer().getPseudo())
                .avatarUrl(playedSuite.getPlayer().getAvatarUrl())
                .lastPlayedAt(playedSuite.getLastPlayedAt())
                .build();
    }

}
