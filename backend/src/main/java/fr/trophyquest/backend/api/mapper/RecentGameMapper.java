package fr.trophyquest.backend.api.mapper;

import fr.trophyquest.backend.api.dto.game.RecentGameDTO;
import fr.trophyquest.backend.domain.entity.views.mart.RecentGame;
import org.springframework.stereotype.Component;

@Component
public class RecentGameMapper {

    public RecentGameDTO toRecentGameDTO(RecentGame recentGame) {
        return RecentGameDTO.builder()
                .id(recentGame.getId())
                .name(recentGame.getName())
                .imageUrl(recentGame.getMasterImageUrl())
                .nbPlayers(recentGame.getNbPlayers())
                .build();
    }
    
}
