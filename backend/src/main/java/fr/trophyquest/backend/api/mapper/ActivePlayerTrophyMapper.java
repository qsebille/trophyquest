package fr.trophyquest.backend.api.mapper;

import fr.trophyquest.backend.api.dto.player.ActivePlayerTrophyDTO;
import fr.trophyquest.backend.domain.entity.views.mart.ActivePlayerTrophy;
import org.springframework.stereotype.Component;

@Component
public class ActivePlayerTrophyMapper {

    public ActivePlayerTrophyDTO toActivePlayerTrophyDTO(ActivePlayerTrophy entity) {
        return ActivePlayerTrophyDTO.builder()
                .id(entity.getId())
                .playerId(entity.getPlayerId())
                .trophyId(entity.getTrophyId())
                .trophySuiteId(entity.getTrophySuiteId())
                .gameId(entity.getGameId())
                .gameName(entity.getGameName())
                .playerPseudo(entity.getPlayerPseudo())
                .playerAvatarUrl(entity.getPlayerAvatarUrl())
                .trophyTitle(entity.getTrophyTitle())
                .trophyType(entity.getTrophyType())
                .trophyIconUrl(entity.getTrophyIconUrl())
                .trophyEarnedAt(entity.getEarnedAt())
                .nbRecentlyEarnedTrophies(entity.getPlayerTrophyCount())
                .build();
    }

}
