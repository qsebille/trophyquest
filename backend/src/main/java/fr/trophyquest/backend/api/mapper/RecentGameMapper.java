package fr.trophyquest.backend.api.mapper;

import fr.trophyquest.backend.api.dto.game.RecentGameDTO;
import fr.trophyquest.backend.domain.entity.views.RecentGameSearchItem;
import org.springframework.stereotype.Component;

@Component
public class RecentGameMapper {

    public RecentGameDTO toDTO(RecentGameSearchItem game) {
        return RecentGameDTO.builder()
                .id(game.getId())
                .name(game.getName())
                .imageUrl(game.getImageUrl())
                .nbPlayers(game.getNbPlayers())
                .build();
    }

}
